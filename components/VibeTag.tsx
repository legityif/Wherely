import { View, Text } from 'react-native';

type Props = {
  label: string;
  variant?: 'light' | 'dark';
};

export default function VibeTag({ label, variant = 'dark' }: Props) {
  const isLight = variant === 'light';
  return (
    <View
      style={{
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: isLight ? 'rgba(255,255,255,0.22)' : '#edeee8',
      }}
    >
      <Text
        style={{
          fontFamily: 'Manrope-SemiBold',
          fontSize: 12,
          color: isLight ? 'rgba(255,255,255,0.9)' : '#5c605a',
          letterSpacing: 0.3,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
