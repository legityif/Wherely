// NOTE: Google Places API calls should be made server-side (Supabase Edge Function)
// to keep the API key out of the client bundle.
// This file contains client-side helpers only.

import { Place } from '@/types';

/**
 * Calculate distance between two lat/lng points in km (Haversine formula).
 */
export function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Deep-link to a place in Google Maps.
 */
export function googleMapsUrl(place: Place): string {
  return `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}&query_place_id=${place.id}`;
}
