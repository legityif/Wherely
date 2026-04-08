import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/store/useUserStore';
import StreakBadge from './StreakBadge';

type Props = {
  streak?: number;
  showStreak?: boolean;
  showLogo?: boolean;
};

export default function HeaderBar({ streak = 0, showStreak = true, showLogo = true }: Props) {
  const router = useRouter();
  const { profile } = useUserStore();

  return (
    <View className="flex-row items-center justify-between px-5 py-3">
      {/* Left: hamburger + logo */}
      <View className="flex-row items-center gap-3">
        <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="menu" size={24} color="#2f342e" />
        </TouchableOpacity>
        {showLogo && (
          <View className="flex-row items-center gap-2">
            <View className="w-7 h-7 rounded-lg bg-primary items-center justify-center">
              <Text className="text-white text-[10px] font-bold">W</Text>
            </View>
            <Text
              className="text-on-surface text-lg"
              style={{ fontFamily: 'NotoSerif-Regular', fontStyle: 'italic' }}
            >
              Wherely
            </Text>
          </View>
        )}
      </View>

      {/* Center-right: streak badge */}
      <View className="flex-row items-center gap-3">
        {showStreak && streak > 0 && <StreakBadge streak={streak} />}

        {/* Right: profile avatar */}
        <TouchableOpacity
          onPress={() => router.push('/profile')}
          className="w-9 h-9 rounded-full overflow-hidden bg-surface-container-high items-center justify-center"
        >
          {profile?.avatar_url ? (
            <Image
              source={{ uri: profile.avatar_url }}
              style={{ width: 36, height: 36 }}
              resizeMode="cover"
            />
          ) : (
            <Ionicons name="person" size={18} color="#5c605a" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
