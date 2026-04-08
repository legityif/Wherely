import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  streak: number;
};

export default function StreakBadge({ streak }: Props) {
  if (streak === 0) return null;

  return (
    <View
      className="flex-row items-center gap-1.5 rounded-full"
      style={{
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#edeee8',
        borderWidth: 1,
        borderColor: 'rgba(175,179,172,0.2)',
      }}
    >
      <Text
        style={{
          fontFamily: 'Manrope-SemiBold',
          fontSize: 12,
          color: '#2f342e',
          letterSpacing: 0.2,
        }}
      >
        {streak}-day streak
      </Text>
      <Ionicons name="flame" size={14} color="#e67e22" />
    </View>
  );
}
