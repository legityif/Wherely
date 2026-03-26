import * as ExpoLocation from 'expo-location';

export type Coords = {
  latitude: number;
  longitude: number;
};

/**
 * Request location permission and return current coordinates.
 * Returns null if permission is denied.
 */
export async function getCurrentLocation(): Promise<Coords | null> {
  const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;

  const location = await ExpoLocation.getCurrentPositionAsync({
    accuracy: ExpoLocation.Accuracy.Balanced,
  });

  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
}
