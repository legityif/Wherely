import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Place } from '@/types';
import HeaderBar from '@/components/HeaderBar';
import FilterChips from '@/components/FilterChips';
import ExploreCard from '@/components/ExploreCard';

const FILTERS = ['Aesthetic', 'Date', 'Chill', 'Outdoors'] as const;

// Mock explore places — will be replaced with real data from the taste engine
const MOCK_EXPLORE_PLACES: Place[] = [
  {
    id: 'explore_velour_library',
    name: 'The Velour Library',
    category: 'Library Bar',
    description: 'A hidden cocktail library wrapped in velvet and dark wood.',
    why_today: 'The reading nooks glow at dusk—an ideal escape for contemplative evenings.',
    lat: -33.8779,
    lng: 151.1810,
    photos: ['https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80'],
    distance_km: 2.4,
    vibe_tags: ['Aesthetic', 'Quiet', 'Date'],
    match_score: 98,
    location_label: 'Chelsea, London',
  },
  {
    id: 'explore_fern_house',
    name: 'The Fern House',
    category: 'Botanical Café',
    description: 'A glass-roofed café nestled inside a heritage greenhouse.',
    why_today: 'Morning sunlight floods the atrium, perfect for a slow brunch.',
    lat: -33.8711,
    lng: 151.2150,
    photos: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80'],
    distance_km: 1.8,
    vibe_tags: ['Chill', 'Aesthetic'],
    match_score: 91,
    location_label: 'Darlinghurst, Sydney',
  },
  {
    id: 'explore_rooftop_garden',
    name: 'Sky Terrace Garden',
    category: 'Rooftop Garden',
    description: 'A secret rooftop garden with panoramic city views.',
    why_today: 'Golden hour hits perfectly at 5 PM today.',
    lat: -33.8650,
    lng: 151.2090,
    photos: ['https://images.unsplash.com/photo-1416339134316-0e91dc9ded92?w=800&q=80'],
    distance_km: 3.1,
    vibe_tags: ['Outdoors', 'Date'],
    match_score: 85,
    location_label: 'The Rocks, Sydney',
  },
];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = 58 + Math.max(insets.bottom, 10);
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<string>('Aesthetic');

  const filtered = MOCK_EXPLORE_PLACES.filter((p) =>
    activeFilter ? p.vibe_tags.includes(activeFilter) : true
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
            Curated Selections
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
            {'Explore\nHidden Gems'}
          </Text>
        </View>

        {/* Filter chips */}
        <FilterChips
          options={[...FILTERS]}
          active={activeFilter}
          onSelect={setActiveFilter}
        />

        {/* Cards */}
        {filtered.length === 0 ? (
          <View className="py-20 px-8 items-center">
            <Text
              className="text-on-surface text-center"
              style={{ fontFamily: 'NotoSerif-Regular', fontStyle: 'italic', fontSize: 20 }}
            >
              No gems found
            </Text>
            <Text className="text-on-surface-variant text-center mt-2 text-sm">
              Try a different vibe filter.
            </Text>
          </View>
        ) : (
          filtered.map((place) => (
            <ExploreCard key={place.id} place={place} />
          ))
        )}

        {/* Didn't find your vibe CTA */}
        <View className="mx-5 mt-4 mb-2 rounded-3xl overflow-hidden">
          <View style={{ backgroundColor: '#d3e7db', borderRadius: 24, padding: 28, alignItems: 'center' }}>
            <Ionicons name="sparkles" size={20} color="#506359" style={{ marginBottom: 12 }} />
            <Text
              style={{
                fontFamily: 'NotoSerif-Regular',
                fontStyle: 'italic',
                fontSize: 24,
                lineHeight: 30,
                color: '#2f342e',
                textAlign: 'center',
                marginBottom: 10,
              }}
            >
              {"Didn't find your\nvibe?"}
            </Text>
            <Text
              style={{
                fontFamily: 'Manrope-Regular',
                fontSize: 14,
                color: '#5c605a',
                textAlign: 'center',
                lineHeight: 20,
                marginBottom: 20,
                paddingHorizontal: 8,
              }}
            >
              Our curator is constantly exploring new corners. Update your taste profile for more precise matches.
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/profile')}
              activeOpacity={0.85}
              style={{ width: '100%' }}
            >
              <LinearGradient
                colors={['#506359', '#44564d']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  borderRadius: 20,
                  paddingVertical: 15,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Manrope-SemiBold',
                    fontSize: 13,
                    color: '#e8fdf0',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                  }}
                >
                  Update Taste Profile
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
