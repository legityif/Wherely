import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSavedPlaces } from '@/hooks/useSavedPlaces';
import PlaceCard from '@/components/PlaceCard';
import ActionBar from '@/components/ActionBar';

export default function PlaceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { savedPlaces } = useSavedPlaces();
  const insets = useSafeAreaInsets();

  const place = savedPlaces.find((p) => p.id === id);

  if (!place) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-on-surface-variant">Place not found.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      {/* Back button */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ top: insets.top + 12 }}
        className="absolute left-5 z-10 w-10 h-10 rounded-full bg-white/80 items-center justify-center shadow"
      >
        <Ionicons name="chevron-back" size={20} color="#506359" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-2">
          <PlaceCard place={place} />
        </View>

        <ActionBar
          place={place}
          onLike={() => {}}
          onSkip={() => {}}
        />

        {place.why_today && (
          <View className="mx-4 mt-5 p-6 bg-surface-container-low rounded-3xl">
            <View className="flex-row items-center gap-2 mb-4">
              <Ionicons name="sparkles" size={16} color="#506359" />
              <Text
                style={{
                  fontFamily: 'Manrope-SemiBold',
                  fontSize: 11,
                  color: '#5c605a',
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                }}
              >
                Why it was suggested
              </Text>
            </View>
            <Text
              className="text-on-surface"
              style={{
                fontFamily: 'NotoSerif-Regular',
                fontStyle: 'italic',
                fontSize: 20,
                lineHeight: 30,
              }}
            >
              {place.why_today}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
