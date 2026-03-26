import { View, Text, TouchableOpacity, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
  variant?: 'default' | 'primary';
};

function ActionButton({ icon, label, onPress, variant = 'default' }: ActionButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`flex-1 aspect-square items-center justify-center rounded-3xl ${
        variant === 'primary' ? 'bg-primary-container' : 'bg-surface-container'
      }`}
    >
      <Ionicons
        name={icon}
        size={22}
        color={variant === 'primary' ? '#506359' : '#5c605a'}
      />
      <Text
        className={`text-[9px] font-bold uppercase mt-2 tracking-wider ${
          variant === 'primary' ? 'text-primary' : 'text-on-surface-variant'
        }`}
      >
        {label}
      </Text>
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
      <ActionButton icon="thumbs-up-outline" label="Like" onPress={onLike} />
      <ActionButton icon="close-outline" label="Skip" onPress={onSkip} />
      <ActionButton icon="star-outline" label="Save" onPress={onSave} />
      <ActionButton icon="map-outline" label="Maps" onPress={openInMaps} variant="primary" />
    </View>
  );
}
