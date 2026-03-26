import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useDailyPlace } from '@/hooks/useDailyPlace';
import { useStreak } from '@/hooks/useStreak';
import PlaceCard from '@/components/PlaceCard';
import ActionBar from '@/components/ActionBar';
import StreakBadge from '@/components/StreakBadge';

export default function HomeScreen() {
  const { place, loading, interact } = useDailyPlace();
  const { streak } = useStreak();
  const tabBarHeight = useBottomTabBarHeight();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <StreakBadge streak={streak} />
        <Text className="text-2xl italic text-primary" style={{ fontFamily: 'serif' }}>
          Wherely
        </Text>
        <View className="w-8" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: tabBarHeight + 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Date */}
        <View className="items-center mb-6 px-6">
          <Text className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-1">
            Today's Suggestion
          </Text>
          <Text className="text-3xl text-on-surface" style={{ fontFamily: 'serif', fontStyle: 'italic' }}>
            {today}
          </Text>
        </View>

        {/* Place Card */}
        <View className="px-4">
          {loading ? (
            <View className="h-[500px] bg-surface-container rounded-[2.5rem] items-center justify-center">
              <Text className="text-on-surface-variant">Finding today's spot…</Text>
            </View>
          ) : place ? (
            <>
              <PlaceCard place={place} />
              <ActionBar
                onLike={() => interact('liked')}
                onSkip={() => interact('skipped')}
                onSave={() => interact('saved')}
                place={place}
              />
            </>
          ) : (
            <View className="h-[300px] bg-surface-container rounded-[2.5rem] items-center justify-center px-8">
              <Text className="text-on-surface-variant text-center">
                No suggestions available nearby. Try expanding your radius in Settings.
              </Text>
            </View>
          )}
        </View>

        {/* Why Today */}
        {place?.why_today && (
          <View className="mx-4 mt-6 p-6 bg-surface-container-low rounded-[2rem]">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="w-7 h-7 rounded-full bg-primary/10 items-center justify-center">
                <Text>✨</Text>
              </View>
              <Text className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant">
                Why today?
              </Text>
            </View>
            <Text
              className="text-xl text-on-surface leading-relaxed"
              style={{ fontFamily: 'serif', fontStyle: 'italic' }}
            >
              "{place.why_today}"
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
