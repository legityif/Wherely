import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '@/store/useUserStore';
import { supabase } from '@/lib/supabase';

const RADIUS_OPTIONS = [2, 5, 10] as const;

export default function SettingsScreen() {
  const { radiusKm, setRadiusKm, resetPreferences } = useUserStore();

  const handleSignOut = () => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => supabase.auth.signOut(),
        // auth state change in _layout.tsx auto-redirects to /auth
      },
    ]);
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Preferences',
      'This will clear your liked, skipped, and saved places. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: resetPreferences,
        },
      ]
    );
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-background">
      <View className="px-6 pt-4 pb-6">
        <Text className="text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant">
          Preferences
        </Text>
        <Text className="text-2xl text-on-surface" style={{ fontFamily: 'NotoSerif-Regular', fontStyle: 'italic' }}>
          Settings
        </Text>
      </View>

      <View className="px-4 space-y-3">
        {/* Radius Picker */}
        <View className="bg-surface-container-low rounded-3xl p-6">
          <Text className="text-[10px] font-label uppercase tracking-[0.15em] text-on-surface-variant mb-4">
            Search Radius
          </Text>
          <View className="flex-row gap-3">
            {RADIUS_OPTIONS.map((r) => (
              <TouchableOpacity
                key={r}
                onPress={() => setRadiusKm(r)}
                className={`flex-1 py-3 rounded-2xl items-center ${
                  radiusKm === r
                    ? 'bg-primary-container'
                    : 'bg-surface-container'
                }`}
              >
                <Text
                  className={`text-sm font-bold ${
                    radiusKm === r ? 'text-on-primary-container' : 'text-on-surface-variant'
                  }`}
                >
                  {r} km
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notifications placeholder */}
        <View className="bg-surface-container-low rounded-3xl p-6 opacity-50">
          <Text className="text-[10px] font-label uppercase tracking-[0.15em] text-on-surface-variant mb-1">
            Notifications
          </Text>
          <Text className="text-sm text-on-surface-variant">Coming in V2</Text>
        </View>

        {/* Reset */}
        <TouchableOpacity
          onPress={handleReset}
          className="bg-error-container/20 rounded-3xl p-5 items-center mt-4"
        >
          <Text className="text-sm font-bold text-error uppercase tracking-widest">
            Reset Preferences
          </Text>
        </TouchableOpacity>

        {/* Sign Out */}
        <TouchableOpacity
          onPress={handleSignOut}
          className="bg-surface-container rounded-3xl p-5 items-center mt-2"
        >
          <Text className="text-sm font-label text-on-surface-variant uppercase tracking-widest">
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
