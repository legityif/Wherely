import { View, Text, TouchableOpacity, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Place } from '@/types';

type Props = {
  place: Place;
  onLike: () => void;
  onSkip: () => void;
  onSave: () => void;
};

type ActionButtonProps = {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress: () => void;
  variant?: 'default' | 'primary' | 'calm';
};

function ActionButton({ icon, label, onPress, variant = 'default' }: ActionButtonProps) {
  const iconColor =
    variant === 'primary' ? '#e8fdf0' : variant === 'calm' ? '#506359' : '#5c605a';
  const labelColor =
    variant === 'primary' ? 'text-on-primary' : variant === 'calm' ? 'text-primary' : 'text-on-surface-variant';

  const inner = (
    <>
      <Ionicons name={icon} size={22} color={iconColor} />
      <Text className={`text-[9px] font-label uppercase mt-2 tracking-wider ${labelColor}`}>
        {label}
      </Text>
    </>
  );

  if (variant === 'primary') {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{ flex: 1, aspectRatio: 1 }}>
        <LinearGradient
          colors={['#506359', '#44564d']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 24 }}
        >
          {inner}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`flex-1 aspect-square items-center justify-center rounded-3xl ${
        variant === 'calm' ? 'bg-primary-fixed-dim/20' : 'bg-surface-container'
      }`}
    >
      {inner}
    </TouchableOpacity>
  );
}

export default function ActionBar({ place, onLike, onSkip, onSave }: Props) {
  const openInMaps = () => {
    const label = encodeURIComponent(place.name);
    const url =
      Platform.OS === 'ios'
        ? `maps://?q=${label}&ll=${place.lat},${place.lng}`
        : `geo:${place.lat},${place.lng}?q=${label}`;
    Linking.openURL(url).catch(() => {
      // Fallback to Google Maps web
      Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`
      );
    });
  };

  return (
    <View className="flex-row gap-3 mt-4">
      <ActionButton icon="thumbs-up-outline" label="Like" onPress={onLike} variant="calm" />
      <ActionButton icon="close-outline" label="Skip" onPress={onSkip} />
      <ActionButton icon="star-outline" label="Save" onPress={onSave} variant="calm" />
      <ActionButton icon="map-outline" label="Maps" onPress={openInMaps} variant="primary" />
    </View>
  );
}
