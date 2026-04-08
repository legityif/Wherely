import { View, Text, ScrollView, TouchableOpacity, Image, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets as useSafeAreaInsetsTab } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { useSavedPlaces } from '@/hooks/useSavedPlaces';
import { Place } from '@/types';
import HeaderBar from '@/components/HeaderBar';
import FilterChips from '@/components/FilterChips';

const CATEGORIES = ['All items', 'Cafés', 'Nature', 'Studios', 'Museums'] as const;

const CATEGORY_KEYWORDS: Record<string, string> = {
  'Cafés': 'caf',
  'Nature': 'park',
  'Studios': 'studio',
  'Museums': 'museum',
};

export default function SavedScreen() {
  const { savedPlaces, loading, refetch } = useSavedPlaces();
  const tabInsets = useSafeAreaInsetsTab();
  const tabBarHeight = 58 + Math.max(tabInsets.bottom, 10);
  const [activeCategory, setActiveCategory] = useState('All items');
  const router = useRouter();

  useFocusEffect(useCallback(() => { refetch(); }, [refetch]));

  const filtered = activeCategory === 'All items'
    ? savedPlaces
    : savedPlaces.filter(p =>
        p.category.toLowerCase().includes(CATEGORY_KEYWORDS[activeCategory] ?? '')
      );

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-background">
      <HeaderBar showStreak={false} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: tabBarHeight + 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-5 pt-2 pb-1">
          <Text
            style={{
              fontFamily: 'Manrope-SemiBold',
              fontSize: 11,
              color: '#506359',
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Personal Archive
          </Text>
          <Text
            className="text-on-surface"
            style={{
              fontFamily: 'NotoSerif-Regular',
              fontStyle: 'italic',
              fontSize: 40,
              lineHeight: 46,
            }}
          >
            {'Your Saved\nPlaces'}
          </Text>
        </View>

        {/* Divider accent */}
        <View className="mx-5 mt-3 mb-1">
          <View style={{ width: 40, height: 3, borderRadius: 2, backgroundColor: '#d3e7db' }} />
        </View>

        {/* Category filter chips */}
        <FilterChips
          options={[...CATEGORIES]}
          active={activeCategory}
          onSelect={setActiveCategory}
        />

        {/* Content */}
        {loading ? (
          <View className="py-20 items-center">
            <Text className="text-on-surface-variant">Loading…</Text>
          </View>
        ) : filtered.length === 0 ? (
          <View className="py-20 px-8 items-center">
            <Ionicons name="bookmark-outline" size={40} color="#afb3ac" style={{ marginBottom: 16 }} />
            <Text
              className="text-on-surface text-center"
              style={{ fontFamily: 'NotoSerif-Regular', fontStyle: 'italic', fontSize: 20 }}
            >
              Nothing here yet
            </Text>
            <Text className="text-on-surface-variant text-center mt-2 text-sm">
              {activeCategory === 'All items'
                ? "Save a place from today's suggestion."
                : `No saved ${activeCategory.toLowerCase()} yet.`}
            </Text>
          </View>
        ) : (
          <View style={{ paddingHorizontal: 16, gap: 16 }}>
            {filtered.map((place) => (
              <SavedCard
                key={place.id}
                place={place}
                onPress={() => router.push(`/place/${place.id}`)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Saved card per new design ───────────────────────────────────────────────────────────────
function SavedCard({ place, onPress }: { place: Place; onPress: () => void }) {
  const thumb = place.photos[0] ?? 'https://placehold.co/600x400/d3e7db/506359?text=Place';

  const openInMaps = () => {
    const label = encodeURIComponent(place.name);
    const url =
      Platform.OS === 'ios'
        ? `maps://?q=${label}&ll=${place.lat},${place.lng}`
        : `geo:${place.lat},${place.lng}?q=${label}`;
    Linking.openURL(url).catch(() => {
      Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`
      );
    });
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View className="bg-surface-container-low rounded-3xl overflow-hidden">
        <Image
          source={{ uri: thumb }}
          style={{ width: '100%', height: 200 }}
          resizeMode="cover"
        />
        <View className="p-5">
          <View className="flex-row items-center gap-1 mb-1">
            <Text
              className="text-on-surface"
              style={{
                fontFamily: 'NotoSerif-Regular',
                fontStyle: 'italic',
                fontSize: 22,
                lineHeight: 28,
              }}
              numberOfLines={1}
            >
              {place.name}
            </Text>
            <Ionicons name="sparkles" size={14} color="#506359" />
          </View>
          <View className="flex-row items-center gap-1 mb-4">
            <Ionicons name="storefront-outline" size={13} color="#5c605a" />
            <Text
              style={{
                fontFamily: 'Manrope-Regular',
                fontSize: 13,
                color: '#5c605a',
              }}
            >
              {place.category}
            </Text>
          </View>
          <TouchableOpacity
            onPress={openInMaps}
            activeOpacity={0.75}
            className="flex-row items-center justify-center gap-2"
            style={{
              backgroundColor: '#edeee8',
              borderRadius: 24,
              paddingVertical: 12,
            }}
          >
            <Ionicons name="map-outline" size={16} color="#5c605a" />
            <Text
              style={{
                fontFamily: 'Manrope-SemiBold',
                fontSize: 13,
                color: '#5c605a',
              }}
            >
              Open in Maps
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
