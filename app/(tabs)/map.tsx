import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useDailyPlace } from '@/hooks/useDailyPlace';
import { useSavedPlaces } from '@/hooks/useSavedPlaces';

export default function MapScreen() {
  const { place } = useDailyPlace();
  const { savedPlaces } = useSavedPlaces();

  const initialRegion = place
    ? {
        latitude: place.lat,
        longitude: place.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    : {
        // Default: Sydney CBD
        latitude: -33.8688,
        longitude: 151.2093,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-background">
      <View className="px-6 pt-4 pb-3">
        <Text className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
          Nearby
        </Text>
        <Text className="text-2xl text-on-surface" style={{ fontFamily: 'serif', fontStyle: 'italic' }}>
          Explore
        </Text>
      </View>

      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_DEFAULT}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton={false}
      >
        {/* Today's place — highlighted */}
        {place && (
          <Marker
            coordinate={{ latitude: place.lat, longitude: place.lng }}
            title={place.name}
            description={place.category}
            pinColor="#506359"
          />
        )}

        {/* Saved places */}
        {savedPlaces.map((p) => (
          <Marker
            key={p.id}
            coordinate={{ latitude: p.lat, longitude: p.lng }}
            title={p.name}
            description={`⭐ ${p.category}`}
            pinColor="#d3e7db"
          />
        ))}
      </MapView>
    </SafeAreaView>
  );
}
