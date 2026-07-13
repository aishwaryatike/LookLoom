// components/ProductCard.tsx

import { router } from "expo-router";
import { Heart, Star } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";

type ProductCardProps = {
  id: string;
  image: string;
  name: string;
  type: string;
  price: number;
  rating: number;
  isFavorite?: boolean;
  onFavoritePress?: () => void;
};

export default function ProductCard({
  id,
  image,
  name,
  type,
  price,
  rating,
  isFavorite = false,
  onFavoritePress,
}: ProductCardProps) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/ProductDetails",
          params: {
            id,
            image,
            name,
            type,
            price: price.toString(),
            rating: rating.toString(),
          },
        })
      }
      className="w-full overflow-hidden rounded-[28px] bg-white"
    >
      {/* Product Image */}
      <View className="relative aspect-[3/4] w-full">
        <Image
          source={{ uri: image }}
          resizeMode="cover"
          className="h-full w-full rounded-t-[28px]"
        />

        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            onFavoritePress?.();
          }}
          className="absolute right-4 top-4 h-12 w-12 items-center justify-center rounded-full bg-black/90"
        >
          <Heart
            size={22}
            color="#fff"
            fill={isFavorite ? "#fff" : "transparent"}
          />
        </Pressable>
      </View>

      {/* Product Details */}
      <View className="min-h-[120px] justify-between px-4 py-4">
        <View>
          <Text
            numberOfLines={1}
            className="text-xl font-bold text-black"
          >
            {name}
          </Text>

          <Text
            numberOfLines={1}
            className="mt-1 text-base text-neutral-400"
          >
            {type}
          </Text>
        </View>

        <View className="mt-5 flex-row items-center justify-between">
          <Text className="text-[18px] font-bold text-black">
            ${price.toFixed(2)}
          </Text>

          <View className="flex-row items-center">
            <Star
              size={18}
              color="#FACC15"
              fill="#FACC15"
            />

            <Text className="ml-1.5 text-base font-semibold text-black">
              {rating.toFixed(1)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}