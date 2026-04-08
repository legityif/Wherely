import { useState, useEffect, useCallback } from 'react';
import { Place } from '@/types';
import { useUserStore } from '@/store/useUserStore';
import { supabase } from '@/lib/supabase';

// In Phase 4, the real places will be fetched from the DB `places` table via join.
// For now, since places aren't actually in the DB yet (we're mocking them),
// we continue to use the in-memory mock MOCK_PLACE from useDailyPlace as a fallback
// so the UI doesn't break.
const MOCK_PLACE: Place = {
  id: 'mock_willow_cafe',
  name: 'The Willow Café',
  category: 'Café',
  description: 'A quiet oasis for your morning brew.',
  why_today: 'Perfect for a sunny morning walk. The light hits the garden terrace just right around 10:00 AM, creating a serene sanctuary for reflection.',
  lat: -33.8885,
  lng: 151.1945,
  photos: [
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80',
  ],
  distance_km: 1.2,
  vibe_tags: ['Cozy', 'Aesthetic', 'Quiet'],
  location_label: 'Newtown, Sydney',
};

type SavedPlacesState = {
  savedPlaces: Place[];
  loading: boolean;
  refetch: () => void;
};

export function useSavedPlaces(): SavedPlacesState {
  const { profile } = useUserStore();
  const [savedPlaces, setSavedPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  // Calling refetch() triggers a re-fetch without unmounting the component
  const refetch = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    if (!profile) {
      setSavedPlaces([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchSaved() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('interactions')
          .select('place_id')
          .eq('user_id', profile!.id)
          .eq('action', 'saved');

        if (error) throw error;

        if (!cancelled) {
          // TODO: Phase 4 — join with `places` table and map to Place[]
          const places = data.map((row) => ({
            ...MOCK_PLACE,
            id: row.place_id,
          }));
          setSavedPlaces(places);
        }
      } catch (e) {
        console.error('Failed to fetch saved places:', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSaved();

    return () => { cancelled = true; };
  }, [profile, tick]);

  return { savedPlaces, loading, refetch };
}
