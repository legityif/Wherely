import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDailyPlace } from '@/hooks/useDailyPlace';
import { useStreak } from '@/hooks/useStreak';
import PlaceCard from '@/components/PlaceCard';
import ActionBar from '@/components/ActionBar';
import HeaderBar from '@/components/HeaderBar';
import SocialSignal from '@/components/SocialSignal';

export default function HomeScreen() {
  const { place, loading, interact, localInteractions } = useDailyPlace();
  const { streak } = useStreak();
  const insets = useSafeAreaInsets();
  const tabBarHeight = 58 + Math.max(insets.bottom, 10);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-background">
      {/* Header bar */}
      <HeaderBar streak={streak} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: tabBarHeight + 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Section label */}
        <View className="px-5 mb-3 mt-2">
          <Text
            style={{
              fontFamily: 'Manrope-SemiBold',
              fontSize: 11,
              color: '#5c605a',
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            Today’s Drop
          </Text>
        </View>

        {/* Place Card */}
        <View className="px-4">
          {loading ? (
            <View className="h-[500px] bg-surface-container rounded-[2rem] items-center justify-center">
              <Text className="text-on-surface-variant">Finding today’s spot…</Text>
            </View>
          ) : place ? (
            <PlaceCard
              place={place}
              onSave={() => interact('saved')}
              isSaved={localInteractions['saved'] ?? false}
            />
          ) : (
            <View className="h-[300px] bg-surface-container rounded-[2rem] items-center justify-center px-8">
              <Text className="text-on-surface-variant text-center">
                No suggestions available nearby. Try expanding your radius in your profile.
              </Text>
            </View>
          )}
        </View>

        {/* Why Today */}
        {place?.why_today && (
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
                Why Today?
              </Text>
            </View>
            <Text
              className="text-on-surface"
              style={{
                fontFamily: 'NotoSerif-Regular',
                fontStyle: 'italic',
                fontSize: 22,
                lineHeight: 32,
              }}
            >
              {place.why_today}
            </Text>
          </View>
        )}

        {/* Social signal */}
        {place && <SocialSignal count={3} />}

        {/* Action bar */}
        {place && (
          <ActionBar
            place={place}
            onLike={() => interact('liked')}
            onSkip={() => interact('skipped')}
            isLiked={localInteractions['liked'] ?? false}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
