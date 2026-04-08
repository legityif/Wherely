import { ScrollView, TouchableOpacity, Text } from 'react-native';

type Props = {
  options: string[];
  active: string;
  onSelect: (option: string) => void;
};

export default function FilterChips({ options, active, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 14, gap: 8 }}
    >
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => onSelect(option)}
          activeOpacity={0.75}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 999,
            backgroundColor: option === active ? '#506359' : '#edeee8',
          }}
        >
          <Text
            style={{
              fontFamily: 'Manrope-SemiBold',
              fontSize: 13,
              color: option === active ? '#e8fdf0' : '#5c605a',
              letterSpacing: 0.3,
            }}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
