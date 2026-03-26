import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { useSavedPlaces } from '@/hooks/useSavedPlaces';
import SavedPlaceRow from '@/components/SavedPlaceRow';

export default function SavedScreen() {
  const { savedPlaces, loading } = useSavedPlaces();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-6 pt-4 pb-3">
        <Text className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
          Your Collection
        </Text>
        <Text className="text-2xl text-on-surface" style={{ fontFamily: 'serif', fontStyle: 'italic' }}>
          Saved Places
        </Text>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-on-surface-variant">Loading…</Text>
        </View>
      ) : savedPlaces.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-4xl mb-4">⭐</Text>
          <Text className="text-on-surface text-center text-lg" style={{ fontFamily: 'serif', fontStyle: 'italic' }}>
            Nothing saved yet
          </Text>
          <Text className="text-on-surface-variant text-center mt-2 text-sm">
            Star a place from today's suggestion to save it here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={savedPlaces}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SavedPlaceRow place={item} />}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120, paddingTop: 8 }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      )}
    </SafeAreaView>
  );
}
