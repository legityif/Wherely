import { useState, useEffect, useCallback } from 'react';
import { Place, InteractionAction } from '@/types';
import { useUserStore } from '@/store/useUserStore';
import { getCurrentLocation } from '@/lib/location';

// ─── Mock data (used until Supabase Edge Function is wired up) ────────────────
const MOCK_PLACE: Place = {
  id: 'mock_willow_cafe',
  name: 'The Willow Cafe',
  category: 'Café',
  description: 'A quiet oasis for your morning brew.',
  why_today: 'Perfect for a sunny morning walk. The light hits the garden terrace between 9 and 11 AM.',
  lat: -33.8885,
  lng: 151.1945,
  photos: [
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80',
  ],
  distance_km: 1.2,
};
// ─────────────────────────────────────────────────────────────────────────────

type DailyPlaceState = {
  place: Place | null;
  loading: boolean;
  error: string | null;
  interact: (action: InteractionAction) => void;
};

export function useDailyPlace(): DailyPlaceState {
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { radiusKm, addInteraction } = useUserStore();

  useEffect(() => {
    let cancelled = false;

    async function fetchDailyPlace() {
      setLoading(true);
      setError(null);
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
    (action: InteractionAction) => {
      if (!place) return;
      addInteraction(place.id, action);

      // TODO: Persist to Supabase:
      // supabase.from('interactions').upsert({ user_id, place_id: place.id, action });
    },
    [place, addInteraction]
  );

  return { place, loading, error, interact };
}
