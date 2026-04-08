import { View, Text, ScrollView, TouchableOpacity, Alert, Image, PanResponder, LayoutChangeEvent } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState, useCallback, useMemo } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { supabase } from '@/lib/supabase';
import { useSavedPlaces } from '@/hooks/useSavedPlaces';

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { profile, setRadiusKm } = useUserStore();
  const { savedPlaces } = useSavedPlaces();

  const streak = profile?.streak_count ?? 0;
  const taste = profile?.taste_profile;
  const radiusKm = profile?.radius_km ?? 5;
  const savedCount = savedPlaces.length || taste?.saved_count || 0;

  const handleSignOut = () => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: () => supabase.auth.signOut() },
    ]);
  };

  // Simple streak history mock (last 7 days)
  const streakHistory = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      label: d.toLocaleDateString('en-US', { weekday: 'narrow' }),
      active: i >= 7 - streak,
    };
  });

  return (
    <View className="flex-1 bg-background">
      {/* Back button */}
      <SafeAreaView edges={['top']} className="absolute left-0 right-0 z-10">
        <View className="flex-row items-center justify-between px-5 py-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-surface-container-high items-center justify-center"
          >
            <Ionicons name="chevron-back" size={20} color="#506359" />
          </TouchableOpacity>
          {/* Avatar */}
          <View className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high items-center justify-center">
            {profile?.avatar_url ? (
              <Image
                source={{ uri: profile.avatar_url }}
                style={{ width: 40, height: 40 }}
                resizeMode="cover"
              />
            ) : (
              <Ionicons name="person" size={20} color="#5c605a" />
            )}
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: insets.top + 60, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-5 mb-6">
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
            The Engine Room
          </Text>
          <Text
            className="text-on-surface"
            style={{
              fontFamily: 'NotoSerif-Regular',
              fontStyle: 'italic',
              fontSize: 38,
              lineHeight: 44,
            }}
          >
            {'Preferences &\nTaste'}
          </Text>
        </View>

        {/* Taste Profile section */}
        <View className="px-5 mb-2">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text
                style={{
                  fontFamily: 'NotoSerif-Regular',
                  fontStyle: 'italic',
                  fontSize: 18,
                  color: '#2f342e',
                }}
              >
                Taste Profile
              </Text>
              <Text
                style={{
                  fontFamily: 'Manrope-Regular',
                  fontSize: 13,
                  color: '#5c605a',
                  marginTop: 2,
                }}
              >
                Your curated aesthetic DNA
              </Text>
            </View>
            <TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Manrope-SemiBold',
                  fontSize: 13,
                  color: '#2f342e',
                  textDecorationLine: 'underline',
                }}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card grid: Primary Vibe + Saved Spots */}
        <View className="px-4 flex-row gap-3 mb-3">
          {/* Primary Vibe */}
          <View
            className="flex-1 rounded-3xl p-5"
            style={{ backgroundColor: '#f4f4ef' }}
          >
            <Text
              style={{
                fontFamily: 'Manrope-SemiBold',
                fontSize: 10,
                color: '#506359',
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              Primary Vibe
            </Text>
            <Text
              style={{
                fontFamily: 'NotoSerif-Regular',
                fontStyle: 'italic',
                fontSize: 24,
                lineHeight: 30,
                color: '#2f342e',
                marginBottom: 12,
              }}
            >
              {taste?.primary_vibe ?? 'Brutalist Zen'}
            </Text>
            <View className="items-end">
              <Ionicons name="compass-outline" size={36} color="#afb3ac" />
            </View>
          </View>

          {/* Saved Spots */}
          <View
            className="rounded-3xl p-5 items-center justify-center"
            style={{ backgroundColor: '#d3e7db', width: 130 }}
          >
            <Ionicons name="heart-outline" size={24} color="#506359" style={{ marginBottom: 8 }} />
            <Text
              style={{
                fontFamily: 'NotoSerif-Regular',
                fontStyle: 'italic',
                fontSize: 32,
                color: '#506359',
              }}
            >
              {savedCount}
            </Text>
            <Text
              style={{
                fontFamily: 'Manrope-SemiBold',
                fontSize: 10,
                color: '#506359',
                letterSpacing: 1,
                textTransform: 'uppercase',
                marginTop: 2,
              }}
            >
              Saved Spots
            </Text>
          </View>
        </View>

        {/* Card grid: Top Textures + Refine Discovery */}
        <View className="px-4 flex-row gap-3 mb-6">
          {/* Top Textures */}
          <View
            className="flex-1 rounded-3xl p-5"
            style={{ backgroundColor: 'rgba(80,99,89,0.12)' }}
          >
            <Text
              style={{
                fontFamily: 'Manrope-SemiBold',
                fontSize: 10,
                color: '#506359',
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              Top Textures
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {(taste?.top_textures ?? ['Raw Concrete', 'Velvet', 'Oak']).map((t) => (
                <View
                  key={t}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: 'rgba(175,179,172,0.3)',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Manrope-SemiBold',
                      fontSize: 11,
                      color: '#2f342e',
                      letterSpacing: 0.3,
                      textTransform: 'uppercase',
                    }}
                  >
                    {t}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Refine Discovery */}
          <TouchableOpacity
            className="rounded-3xl p-5 items-center justify-center"
            style={{ backgroundColor: '#f4f4ef', width: 130 }}
            activeOpacity={0.75}
          >
            <Ionicons name="sparkles" size={24} color="#506359" style={{ marginBottom: 8 }} />
            <Text
              style={{
                fontFamily: 'Manrope-SemiBold',
                fontSize: 12,
                color: '#2f342e',
                textAlign: 'center',
              }}
            >
              Refine{'\n'}Discovery
            </Text>
          </TouchableOpacity>
        </View>

        {/* Discovery Radius */}
        <View className="px-5 mb-6">
          <View className="bg-surface-container-low rounded-3xl p-6">
            <Text
              style={{
                fontFamily: 'NotoSerif-Regular',
                fontStyle: 'italic',
                fontSize: 22,
                color: '#2f342e',
                marginBottom: 4,
              }}
            >
              Discovery Radius
            </Text>
            <Text
              style={{
                fontFamily: 'Manrope-Regular',
                fontSize: 14,
                color: '#5c605a',
                marginBottom: 24,
              }}
            >
              How far shall we roam today?
            </Text>

            {/* Draggable slider */}
            <DraggableRadiusSlider value={radiusKm} onChange={setRadiusKm} />

            {/* Value + mode labels */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 20 }}>
              <View>
                <Text
                  style={{
                    fontFamily: 'NotoSerif-Regular',
                    fontStyle: 'italic',
                    fontSize: 36,
                    color: '#2f342e',
                    lineHeight: 40,
                  }}
                >
                  {radiusKm}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Manrope-SemiBold',
                    fontSize: 10,
                    color: '#5c605a',
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    marginTop: 2,
                  }}
                >
                  Kilometers
                </Text>
              </View>
              <View style={{ alignItems: 'stretch', minWidth: 120 }}>
                <View
                  style={{
                    backgroundColor: radiusKm <= 5 ? '#506359' : '#edeee8',
                    borderRadius: 16,
                    paddingHorizontal: 14,
                    paddingVertical: 7,
                    marginBottom: 6,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Manrope-SemiBold',
                      fontSize: 11,
                      color: radiusKm <= 5 ? '#e8fdf0' : '#5c605a',
                      letterSpacing: 0.8,
                      textTransform: 'uppercase',
                    }}
                  >
                    Local Focus
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: 'Manrope-Regular',
                    fontSize: 12,
                    color: radiusKm > 5 ? '#506359' : '#afb3ac',
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                  }}
                >
                  Global Roam
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Streak History */}
        <View className="px-5 mb-6">
          <View className="bg-primary-container rounded-3xl p-6">
            <Text
              style={{
                fontFamily: 'Manrope-SemiBold',
                fontSize: 10,
                color: '#506359',
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              Streak History
            </Text>
            <View className="flex-row items-baseline mb-4" style={{ flexWrap: 'wrap', gap: 8 }}>
              <Text
                style={{
                  fontFamily: 'NotoSerif-Regular',
                  fontStyle: 'italic',
                  fontSize: 42,
                  lineHeight: 46,
                  color: '#506359',
                }}
              >
                {streak}
              </Text>
              <Text
                style={{
                  fontFamily: 'NotoSerif-Regular',
                  fontStyle: 'italic',
                  fontSize: 18,
                  color: '#2f342e',
                  flexShrink: 1,
                }}
              >
                {streak === 1 ? 'day' : 'days'} and counting
              </Text>
            </View>
            {/* Weekly dots */}
            <View className="flex-row justify-between">
              {streakHistory.map((day, i) => (
                <View key={i} className="items-center" style={{ gap: 6 }}>
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: day.active ? '#506359' : 'rgba(80,99,89,0.12)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {day.active && (
                      <Ionicons name="checkmark" size={16} color="#e8fdf0" />
                    )}
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Manrope-SemiBold',
                      fontSize: 10,
                      color: day.active ? '#506359' : '#afb3ac',
                    }}
                  >
                    {day.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Sign Out */}
        <View className="px-5">
          <TouchableOpacity
            onPress={handleSignOut}
            className="rounded-3xl p-4 items-center"
            style={{ backgroundColor: '#edeee8' }}
          >
            <Text
              style={{
                fontFamily: 'Manrope-SemiBold',
                fontSize: 12,
                color: '#5c605a',
                letterSpacing: 1.5,
                textTransform: 'uppercase',
              }}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Draggable radius slider ─────────────────────────────────────────────────
const RADIUS_STOPS = [2, 5, 10] as const;
const THUMB_SIZE = 22;

function DraggableRadiusSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [trackWidth, setTrackWidth] = useState(0);
  const trackRef = useRef<View>(null);
  const trackOffsetX = useRef(0);

  // Resolve current stop index
  const activeIndex = RADIUS_STOPS.indexOf(value as typeof RADIUS_STOPS[number]);
  const resolvedIndex = activeIndex >= 0
    ? activeIndex
    : RADIUS_STOPS.reduce((best, s, i) => (Math.abs(s - value) < Math.abs(RADIUS_STOPS[best] - value) ? i : best), 0);

  const fillFraction = trackWidth > 0 ? resolvedIndex / (RADIUS_STOPS.length - 1) : 0;

  // Use a ref so PanResponder always calls the latest version (avoids stale closure)
  const snapFnRef = useRef((pageX: number) => {});
  snapFnRef.current = (pageX: number) => {
    if (trackWidth <= 0) return;
    const x = pageX - trackOffsetX.current;
    const fraction = Math.max(0, Math.min(1, x / trackWidth));
    let closest = 0;
    let minDist = Infinity;
    for (let i = 0; i < RADIUS_STOPS.length; i++) {
      const stopFrac = i / (RADIUS_STOPS.length - 1);
      const dist = Math.abs(fraction - stopFrac);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    }
    onChange(RADIUS_STOPS[closest]);
  };

  // PanResponder created once — delegates to ref to avoid stale closures
  const panResponder = useMemo(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        // Re-measure on touch start in case the view scrolled
        trackRef.current?.measureInWindow((x) => {
          trackOffsetX.current = x;
          snapFnRef.current(evt.nativeEvent.pageX);
        });
      },
      onPanResponderMove: (evt) => {
        snapFnRef.current(evt.nativeEvent.pageX);
      },
    }),
  []);

  const onTrackLayout = useCallback((e: LayoutChangeEvent) => {
    setTrackWidth(e.nativeEvent.layout.width);
    trackRef.current?.measureInWindow((x) => {
      trackOffsetX.current = x;
    });
  }, []);

  const thumbLeft = fillFraction * trackWidth - THUMB_SIZE / 2;

  return (
    <View
      ref={trackRef}
      onLayout={onTrackLayout}
      style={{ height: 44, justifyContent: 'center' }}
      {...panResponder.panHandlers}
    >
      {/* Background track */}
      <View style={{ height: 3, borderRadius: 1.5, backgroundColor: '#c8ccc4' }}>
        {/* Filled portion */}
        <View
          style={{
            height: 3,
            borderRadius: 1.5,
            backgroundColor: '#506359',
            width: trackWidth > 0 ? fillFraction * trackWidth : 0,
          }}
        />
      </View>
      {/* Draggable thumb */}
      {trackWidth > 0 && (
        <View
          style={{
            position: 'absolute',
            left: thumbLeft,
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            borderRadius: THUMB_SIZE / 2,
            backgroundColor: '#506359',
          }}
        />
      )}
    </View>
  );
}
