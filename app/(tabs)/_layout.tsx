import { Tabs } from 'expo-router';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { StyleSheet, Platform, View, Text, TouchableOpacity } from 'react-native';

// ─── Tab config ──────────────────────────────────────────────────────────────
const TAB_META: Record<string, { label: string; icon: string; iconFocused: string }> = {
  index:   { label: 'Today',   icon: 'sparkles-outline',  iconFocused: 'sparkles' },
  explore: { label: 'Explore', icon: 'compass-outline',   iconFocused: 'compass' },
  saved:   { label: 'Saved',   icon: 'bookmark-outline',  iconFocused: 'bookmark' },
};

// ─── Fully custom tab bar ────────────────────────────────────────────────────
function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        overflow: 'hidden',
        shadowColor: '#2f342e',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 8,
      }}
    >
      {/* Background */}
      <View style={StyleSheet.absoluteFill}>
        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(250,249,245,0.96)' }]} />
        {Platform.OS === 'ios' && (
          <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
        )}
      </View>

      {/* Tab buttons */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 10,
          paddingBottom: Math.max(insets.bottom, 10),
          paddingHorizontal: 16,
          gap: 8,
        }}
      >
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const meta = TAB_META[route.name] ?? { label: route.name, icon: 'ellipse-outline', iconFocused: 'ellipse' };

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              onPress={onPress}
              activeOpacity={0.7}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: focused ? '#d3e7db' : 'transparent',
                  borderRadius: 24,
                  overflow: 'hidden',
                  paddingVertical: 8,
                  paddingHorizontal: 18,
                  gap: 3,
                }}
              >
                <Ionicons
                  name={(focused ? meta.iconFocused : meta.icon) as React.ComponentProps<typeof Ionicons>['name']}
                  size={20}
                  color={focused ? '#506359' : 'rgba(47,52,46,0.4)'}
                />
                <Text
                  style={{
                    fontFamily: 'Manrope-SemiBold',
                    fontSize: 10,
                    letterSpacing: 0.6,
                    textTransform: 'uppercase',
                    color: focused ? '#506359' : 'rgba(47,52,46,0.4)',
                  }}
                >
                  {meta.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// ─── Layout ──────────────────────────────────────────────────────────────────
export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: 'Today' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
      <Tabs.Screen name="saved" options={{ title: 'Saved' }} />
    </Tabs>
  );
}
