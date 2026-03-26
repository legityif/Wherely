import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Place } from '@/types';

type Props = {
  place: Place;
};

export default function SavedPlaceRow({ place }: Props) {
  const router = useRouter();
  const thumb = place.photos[0] ?? 'https://placehold.co/120x120/d3e7db/506359?text=📍';

  return (
    <TouchableOpacity
      onPress={() => router.push(`/place/${place.id}`)}
      activeOpacity={0.8}
      className="flex-row items-center bg-surface-container-low rounded-3xl p-3 gap-4"
    >
      <Image
        source={{ uri: thumb }}
        className="w-20 h-20 rounded-2xl"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="text-on-surface font-semibold text-base" numberOfLines={1}>
          {place.name}
        </Text>
        <Text className="text-on-surface-variant text-xs mt-0.5">
          {place.category} ·{' '}
          {place.distance_km < 1
            ? `${Math.round(place.distance_km * 1000)}m`
            : `${place.distance_km.toFixed(1)} km`}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#afb3ac" />
    </TouchableOpacity>
  );
}
