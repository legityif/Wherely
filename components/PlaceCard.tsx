import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Place } from '@/types';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32; // px-4 on each side
const CARD_HEIGHT = 480;

type Props = {
  place: Place;
};

export default function PlaceCard({ place }: Props) {
  const photos = place.photos.length > 0 ? place.photos : ['https://placehold.co/600x800/d3e7db/506359?text=No+Photo'];

  return (
    <View
      style={{
        borderRadius: 40,
        overflow: 'hidden',
        backgroundColor: '#edeee8',
        shadowColor: '#2f342e',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 4,
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
              colors={['transparent', 'rgba(47,52,46,0.82)']}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: CARD_HEIGHT * 0.65,
              }}
            />
          </View>
        ))}
      </ScrollView>

      {/* Floating tags */}
      <View className="absolute top-5 left-5 flex-row gap-2">
        <View className="px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.75)' }}>
          <Text className="text-[10px] font-bold uppercase tracking-wider text-primary">
            {place.category}
          </Text>
        </View>
        <View className="px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.75)' }}>
          <Text className="text-[10px] font-bold uppercase tracking-wider text-primary">
            {place.distance_km < 1
              ? `${Math.round(place.distance_km * 1000)}m`
              : `${place.distance_km.toFixed(1)} km`}
          </Text>
        </View>
      </View>

      {/* Bottom content overlay */}
      <View className="absolute bottom-0 left-0 right-0 p-7">
        <Text
          className="text-white text-4xl leading-tight mb-1"
          style={{ fontFamily: 'NotoSerif-Regular', fontStyle: 'italic' }}
        >
          {place.name}
        </Text>
        <Text className="text-white/85 text-sm font-light">{place.description}</Text>
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
