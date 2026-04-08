import { View, Text, Image } from 'react-native';

type Props = {
  count: number;
  label?: string;
  sublabel?: string;
  variant?: 'card' | 'inline';
};

// Mock avatar URLs for social proof
const MOCK_AVATARS = [
  'https://i.pravatar.cc/80?img=12',
  'https://i.pravatar.cc/80?img=32',
  'https://i.pravatar.cc/80?img=47',
];

export default function SocialSignal({
  count,
  label,
  sublabel = 'YOUR CIRCLE',
  variant = 'card',
}: Props) {
  const displayLabel = label ?? `${count} people like you saved this`;

  if (variant === 'inline') {
    return (
      <View className="flex-row items-center gap-2">
        <AvatarStack />
        <View>
          <Text
            style={{
              fontFamily: 'Manrope-SemiBold',
              fontSize: 10,
              color: '#506359',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            }}
          >
            Friends liked this
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      className="mx-4 mt-4 rounded-3xl p-5"
      style={{ backgroundColor: 'rgba(211,231,219,0.35)' }}
    >
      <View className="flex-row items-center gap-3">
        <AvatarStack />
        <View className="flex-1">
          <Text
            style={{
              fontFamily: 'Manrope-Regular',
              fontSize: 14,
              color: '#2f342e',
            }}
          >
            {displayLabel}
          </Text>
          <Text
            style={{
              fontFamily: 'Manrope-SemiBold',
              fontSize: 10,
              color: '#506359',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              marginTop: 2,
            }}
          >
            {sublabel}
          </Text>
        </View>
      </View>
    </View>
  );
}

function AvatarStack() {
  return (
    <View className="flex-row" style={{ paddingLeft: 4 }}>
      {MOCK_AVATARS.map((uri, i) => (
        <Image
          key={i}
          source={{ uri }}
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            borderWidth: 2,
            borderColor: '#faf9f5',
            marginLeft: i === 0 ? 0 : -10,
          }}
          resizeMode="cover"
        />
      ))}
    </View>
  );
}
