import { useState, useEffect, useCallback } from 'react';
import { Place, InteractionAction } from '@/types';
import { useUserStore } from '@/store/useUserStore';
import { getCurrentLocation } from '@/lib/location';
import { supabase } from '@/lib/supabase';

// ─── Mock data (used until Supabase Edge Function is wired up) ────────────────
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
// ─────────────────────────────────────────────────────────────────────────────

type DailyPlaceState = {
  place: Place | null;
  loading: boolean;
  error: string | null;
  interact: (action: InteractionAction) => void;
  localInteractions: Record<string, boolean>;
};

export function useDailyPlace(): DailyPlaceState {
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { profile } = useUserStore();
  const radiusKm = profile?.radius_km || 5;

  // Local state to track which interactions the user has performed on the current place
  // This allows immediate UI feedback without waiting for a Supabase re-fetch
  const [localInteractions, setLocalInteractions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let cancelled = false;

    async function fetchDailyPlace() {
      setLoading(true);
      setError(null);
      setLocalInteractions({}); // reset local interaction state for new place
      try {
        const coords = await getCurrentLocation();

        // TODO: Replace mock with Supabase Edge Function call:
        // const { data, error } = await supabase.functions.invoke('daily-place', {
        //   body: { lat: coords?.latitude, lng: coords?.longitude, radius_km: radiusKm },
        // });
        // if (error) throw error;
        // if (!cancelled) setPlace(data);

        // Using mock for now
        await new Promise((r) => setTimeout(r, 800)); // Simulate network
        if (!cancelled) {
          const mock = { ...MOCK_PLACE };
          if (coords) {
            // Update distance with real user position
            const { haversineKm } = await import('@/lib/places');
            mock.distance_km = haversineKm(
              coords.latitude,
              coords.longitude,
              mock.lat,
              mock.lng
            );
          }
          setPlace(mock);
        }
      } catch (e: unknown) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchDailyPlace();
    return () => { cancelled = true; };
  }, [radiusKm]);

  const interact = useCallback(
    async (action: InteractionAction) => {
      if (!place || !profile) return;

      const isActive = localInteractions[action] ?? false;

      // Optimistic toggle
      setLocalInteractions((prev) => ({ ...prev, [action]: !isActive }));

      try {
        if (isActive) {
          // Second press = untoggle: remove the row from the database
          const { error } = await supabase
            .from('interactions')
            .delete()
            .eq('user_id', profile.id)
            .eq('place_id', place.id)
            .eq('action', action);
          if (error) throw error;
        } else {
          // First press: insert
          const { error } = await supabase.from('interactions').upsert(
            { user_id: profile.id, place_id: place.id, action },
            { onConflict: 'user_id, place_id, action' }
          );
          if (error) throw error;
        }
      } catch (e) {
        console.error('Failed to save interaction:', e);
        // Revert optimistic update on failure
        setLocalInteractions((prev) => ({ ...prev, [action]: isActive }));
      }
    },
    [place, profile, localInteractions]
  );

  return { place, loading, error, interact, localInteractions };
}
