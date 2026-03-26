import { useMemo } from 'react';
import { Place } from '@/types';
import { useUserStore } from '@/store/useUserStore';

// TODO: Replace with Supabase query once backend is wired up.
// For now, we re-hydrate Place objects from the in-memory store.
// The full Place cache will live in Supabase `places` table.
const PLACE_CACHE: Record<string, Place> = {};

export function registerPlaceInCache(place: Place) {
  PLACE_CACHE[place.id] = place;
}

type SavedPlacesState = {
  savedPlaces: Place[];
  loading: boolean;
};

export function useSavedPlaces(): SavedPlacesState {
  const { interactions } = useUserStore();

  const savedPlaces = useMemo(() => {
    return interactions
      .filter((i) => i.action === 'saved')
      .map((i) => PLACE_CACHE[i.placeId])
      .filter((p): p is Place => p !== undefined);
  }, [interactions]);

  return { savedPlaces, loading: false };
}
