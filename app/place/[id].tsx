import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSavedPlaces } from '@/hooks/useSavedPlaces';
import PlaceCard from '@/components/PlaceCard';
import ActionBar from '@/components/ActionBar';

export default function PlaceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { savedPlaces } = useSavedPlaces();

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
        className="absolute top-14 left-5 z-10 w-10 h-10 rounded-full bg-white/80 items-center justify-center shadow"
      >
        <Ionicons name="chevron-back" size={20} color="#506359" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <PlaceCard place={place} />
        <View className="px-4 mt-4">
          <ActionBar
            onLike={() => {}}
            onSkip={() => {}}
            onSave={() => {}}
            place={place}
          />
        </View>

        {place.why_today && (
          <View className="mx-4 mt-6 p-6 bg-surface-container-low rounded-[2rem]">
            <Text className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant mb-3">
              Why it was suggested
            </Text>
            <Text
              className="text-xl text-on-surface leading-relaxed"
              style={{ fontFamily: 'serif', fontStyle: 'italic' }}
            >
              "{place.why_today}"
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
