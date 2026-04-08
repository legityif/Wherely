import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Place } from '@/types';
import SocialSignal from './SocialSignal';

type Props = {
  place: Place;
  onPress?: () => void;
};

export default function ExploreCard({ place, onPress }: Props) {
  const thumb = place.photos[0] ?? 'https://placehold.co/600x400/d3e7db/506359?text=Place';

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} className="mx-5 mb-6">
      {/* Image with match badge */}
      <View className="rounded-3xl overflow-hidden" style={{ height: 220 }}>
        <Image
          source={{ uri: thumb }}
          style={{ width: '100%', height: 220 }}
          resizeMode="cover"
        />
        {/* Match badge */}
        {place.match_score != null && (
          <View
            className="absolute top-4 right-4 flex-row items-center gap-1.5 px-3 py-2 rounded-full"
            style={{ backgroundColor: 'rgba(250,249,245,0.92)' }}
          >
            <View className="w-2 h-2 rounded-full bg-primary" />
            <Text
              style={{
                fontFamily: 'Manrope-SemiBold',
                fontSize: 12,
                color: '#2f342e',
              }}
            >
              {place.match_score}% match
            </Text>
          </View>
        )}
      </View>

      {/* Info section */}
      <View className="mt-3 flex-row items-start justify-between">
        <View className="flex-1">
          <Text
            className="text-on-surface"
            style={{
              fontFamily: 'NotoSerif-Regular',
              fontStyle: 'italic',
              fontSize: 24,
              lineHeight: 30,
            }}
            numberOfLines={2}
          >
            {place.name}
          </Text>
          {place.location_label && (
            <View className="flex-row items-center gap-1 mt-1.5">
              <Ionicons name="location-outline" size={13} color="#5c605a" />
              <Text
                style={{
                  fontFamily: 'Manrope-Regular',
                  fontSize: 13,
                  color: '#5c605a',
                }}
              >
                {place.location_label}
              </Text>
            </View>
          )}
        </View>

        {/* Friend signal */}
        <View className="ml-3 mt-1">
          <SocialSignal count={2} variant="inline" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
