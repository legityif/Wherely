import { View, Text, TouchableOpacity, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Place } from '@/types';

type Props = {
  place: Place;
  onLike: () => void;
  onSkip: () => void;
  onShare?: () => void;
  isLiked?: boolean;
};

type ActionButtonProps = {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress: () => void;
  active?: boolean;
};

function ActionButton({ icon, label, onPress, active = false }: ActionButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-1 items-center"
      style={{ gap: 8 }}
    >
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: active ? '#506359' : '#f4f4ef',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: active ? 0 : 1,
          borderColor: 'rgba(175,179,172,0.25)',
        }}
      >
        <Ionicons name={icon} size={22} color={active ? '#e8fdf0' : '#5c605a'} />
      </View>
      <Text
        style={{
          fontFamily: 'Manrope-SemiBold',
          fontSize: 10,
          color: '#5c605a',
          letterSpacing: 1,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function ActionBar({ place, onLike, onSkip, onShare, isLiked }: Props) {
  const handleShare = () => {
    if (onShare) {
      onShare();
      return;
    }
    Share.share({
      message: `Check out ${place.name} on Wherely! https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`,
    }).catch(() => {});
  };

  return (
    <View
      className="mx-4 mt-4 rounded-3xl p-5"
      style={{ backgroundColor: '#f4f4ef' }}
    >
      <View className="flex-row">
        <ActionButton
          icon={isLiked ? 'thumbs-up' : 'thumbs-up-outline'}
          label={isLiked ? 'Liked' : 'Like'}
          onPress={onLike}
          active={isLiked}
        />
        <ActionButton
          icon="close-outline"
          label="Skip"
          onPress={onSkip}
        />
        <ActionButton
          icon="share-social-outline"
          label="Share"
          onPress={handleShare}
        />
      </View>
    </View>
  );
}
