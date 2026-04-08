import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity, Linking, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Place } from '@/types';
import VibeTag from './VibeTag';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32; // px-4 on each side
const CARD_HEIGHT = 500;

type Props = {
  place: Place;
  onSave?: () => void;
  isSaved?: boolean;
};

export default function PlaceCard({ place, onSave, isSaved }: Props) {
  const photos = place.photos.length > 0 ? place.photos : ['https://placehold.co/600x800/d3e7db/506359?text=No+Photo'];

  const openInMaps = () => {
    const label = encodeURIComponent(place.name);
    const url =
      Platform.OS === 'ios'
        ? `maps://?q=${label}&ll=${place.lat},${place.lng}`
        : `geo:${place.lat},${place.lng}?q=${label}`;
    Linking.openURL(url).catch(() => {
      Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`
      );
    });
  };

  const distanceLabel = place.distance_km < 1
    ? `${Math.round(place.distance_km * 1000)}m away`
    : `${place.distance_km.toFixed(1)} km away`;

  return (
    <View
      style={{
        borderRadius: 32,
        overflow: 'hidden',
        backgroundColor: '#edeee8',
        shadowColor: '#2f342e',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 6,
      }}
    >
      {/* Image Carousel */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ height: CARD_HEIGHT, width: CARD_WIDTH }}
      >
        {photos.map((uri, index) => (
          <View key={index} style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}>
            <Image
              source={{ uri }}
              style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
              resizeMode="cover"
            />
            {/* Gradient overlay */}
            <LinearGradient
              colors={['transparent', 'rgba(47,52,46,0.75)']}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: CARD_HEIGHT * 0.6,
              }}
            />
          </View>
        ))}
      </ScrollView>

      {/* Bottom content overlay — distance, name, vibe tags */}
      <View className="absolute bottom-0 left-0 right-0 px-6 pb-6">
        {/* Distance badge */}
        <View className="flex-row items-center gap-1.5 mb-2">
          <Ionicons name="location" size={13} color="#d3e7db" />
          <Text
            style={{
              fontFamily: 'Manrope-Regular',
              fontSize: 13,
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            {distanceLabel}
          </Text>
        </View>

        {/* Place name */}
        <Text
          className="text-white mb-3"
          style={{
            fontFamily: 'NotoSerif-Regular',
            fontStyle: 'italic',
            fontSize: 34,
            lineHeight: 40,
          }}
        >
          {place.name}
        </Text>

        {/* Vibe tags */}
        {place.vibe_tags?.length > 0 && (
          <View className="flex-row gap-2 mb-5">
            {place.vibe_tags.map((tag) => (
              <VibeTag key={tag} label={tag} variant="light" />
            ))}
          </View>
        )}

        {/* Save button + Open in Maps */}
        <View className="flex-row items-center gap-3">
          {onSave && (
            <TouchableOpacity
              onPress={onSave}
              activeOpacity={0.7}
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: 'rgba(255,255,255,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons
                name={isSaved ? 'star' : 'star-outline'}
                size={22}
                color="white"
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={openInMaps}
            activeOpacity={0.8}
            className="flex-1 flex-row items-center justify-center gap-2"
            style={{
              backgroundColor: 'rgba(80,99,89,0.75)',
              borderRadius: 24,
              paddingVertical: 14,
            }}
          >
            <Ionicons name="navigate" size={16} color="#e8fdf0" />
            <Text
              style={{
                fontFamily: 'Manrope-SemiBold',
                fontSize: 14,
                color: '#e8fdf0',
                letterSpacing: 0.3,
              }}
            >
              Open in Maps
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Photo count dots */}
      {photos.length > 1 && (
        <View className="absolute bottom-5 right-6 flex-row gap-1">
          {photos.map((_, i) => (
            <View
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: i === 0 ? 'white' : 'rgba(255,255,255,0.4)' }}
            />
          ))}
        </View>
      )}
    </View>
  );
}
