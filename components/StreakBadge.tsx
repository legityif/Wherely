import { View, Text } from 'react-native';

type Props = {
  streak: number;
};

export default function StreakBadge({ streak }: Props) {
  if (streak === 0) return <View className="w-8" />;

  return (
    <View className="flex-row items-center gap-1 px-3 py-1.5 bg-surface-container-high rounded-full">
      <Text style={{ fontSize: 12 }}>🔥</Text>
      <Text className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
        {streak}-day streak
      </Text>
    </View>
  );
}
