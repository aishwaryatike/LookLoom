// components/ProductDetails.tsx

import {
    ArrowLeft,
    Heart,
    Minus,
    Plus,
    ShoppingBag,
    Star,
} from "lucide-react-native";
import { useMemo, useState } from "react";
import {
    Dimensions,
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from "react-native";

const { height } = Dimensions.get("window");

type Props = {
    image: string;
    name: string;
    description: string;
    price: number;
    rating: number;
    reviews: number;

    sizes?: string[];
    colors?: string[];

    onBack: () => void;
    onFavorite?: () => void;
    onAddToCart?: (payload: {
        quantity: number;
        size: string;
        color: string;
    }) => void;
};

export default function ProductDetails({
    image,
    name,
    description,
    price,
    rating,
    reviews,
    sizes = ["S", "M", "L", "XL"],
    colors = ["#000000", "#6B7280", "#A16207", "#2563EB"],
    onBack,
    onFavorite,
    onAddToCart,
}: Props) {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(sizes[1]);
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [favorite, setFavorite] = useState(false);

    const total = useMemo(
        () => quantity * price,
        [quantity, price]
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Image */}
            <View
                style={{
                    height: height * 0.45,
                }}
                className="relative"
            >
                <Image
                    source={{ uri: image }}
                    resizeMode="cover"
                    className="h-full w-full"
                />

                {/* Back */}
                <Pressable
                    onPress={onBack}
                    className="absolute left-5 top-14 h-12 w-12 items-center justify-center rounded-full bg-white"
                >
                    <ArrowLeft
                        size={22}
                        color="#000"
                    />
                </Pressable>

                {/* Favourite */}
                <Pressable
                    onPress={() => {
                        setFavorite(!favorite);
                        onFavorite?.();
                    }}
                    className="absolute right-5 top-14 h-12 w-12 items-center justify-center rounded-full bg-black"
                >
                    <Heart
                        size={20}
                        color="#fff"
                        fill={favorite ? "#fff" : "transparent"}
                    />
                </Pressable>
            </View>

            {/* Details */}
            <View className="flex-1 rounded-t-[34px] bg-white -mt-8">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        padding: 24,
                        paddingBottom: 140,
                    }}
                >
                    {/* Name */}
                    <Text className="text-3xl font-bold text-black">
                        {name}
                    </Text>

                    {/* Reviews */}
                    <View className="mt-3 flex-row items-center">
                        <Star
                            size={18}
                            color="#FACC15"
                            fill="#FACC15"
                        />

                        <Text className="ml-2 text-base font-semibold">
                            {rating}
                        </Text>

                        <Text className="ml-2 text-base text-neutral-500">
                            ({reviews} Reviews)
                        </Text>
                    </View>

                    {/* Quantity */}
                    <View className="mt-8 flex-row items-center justify-between">
                        <Text className="text-xl font-semibold">
                            Quantity
                        </Text>

                        <View className="flex-row items-center">
                            <Pressable
                                disabled={quantity === 1}
                                onPress={() =>
                                    setQuantity((q) =>
                                        Math.max(1, q - 1)
                                    )
                                }
                                className="h-11 w-11 items-center justify-center rounded-full bg-neutral-100"
                            >
                                <Minus size={18} />
                            </Pressable>

                            <Text className="mx-6 text-xl font-bold">
                                {quantity}
                            </Text>

                            <Pressable
                                onPress={() =>
                                    setQuantity((q) => q + 1)
                                }
                                className="h-11 w-11 items-center justify-center rounded-full bg-black"
                            >
                                <Plus
                                    size={18}
                                    color="#fff"
                                />
                            </Pressable>
                        </View>
                    </View>

                    {/* Size */}
                    <View className="mt-10">
                        <Text className="mb-4 text-xl font-semibold">
                            Choose Size
                        </Text>

                        <View className="flex-row justify-between">
                            {sizes.map((size) => {
                                const active =
                                    selectedSize === size;

                                return (
                                    <Pressable
                                        key={size}
                                        onPress={() =>
                                            setSelectedSize(size)
                                        }
                                        className={`h-14 w-14 items-center justify-center rounded-full border-2 ${active
                                                ? "border-black bg-black"
                                                : "border-neutral-300"
                                            }`}
                                    >
                                        <Text
                                            className={`font-bold ${active
                                                    ? "text-white"
                                                    : "text-black"
                                                }`}
                                        >
                                            {size}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>

                    {/* Colors */}
                    <View className="mt-10">
                        <Text className="mb-4 text-xl font-semibold">
                            Choose Color
                        </Text>

                        <View className="flex-row">
                            {colors.map((color) => {
                                const active =
                                    selectedColor === color;

                                return (
                                    <Pressable
                                        key={color}
                                        onPress={() =>
                                            setSelectedColor(color)
                                        }
                                        className={`mr-4 h-12 w-12 items-center justify-center rounded-full border-2 ${active
                                                ? "border-black"
                                                : "border-transparent"
                                            }`}
                                    >
                                        <View
                                            style={{
                                                backgroundColor: color,
                                            }}
                                            className="h-8 w-8 rounded-full"
                                        />
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>

                    {/* Description */}
                    <View className="mt-10">
                        <Text className="mb-3 text-xl font-semibold">
                            Description
                        </Text>

                        <Text className="text-base leading-7 text-neutral-500">
                            {description}
                        </Text>
                    </View>
                </ScrollView>

                {/* Bottom Add To Cart */}
                <View className="absolute bottom-0 left-0 right-0 border-t border-neutral-200 bg-white px-6 py-5">
                    <View className="flex-row items-center justify-between">
                        <View>
                            <Text className="text-sm text-neutral-500">
                                Total Price
                            </Text>

                            <Text className="mt-1 text-3xl font-bold">
                                ${total.toFixed(2)}
                            </Text>
                        </View>

                        <Pressable
                            onPress={() =>
                                onAddToCart?.({
                                    quantity,
                                    size: selectedSize,
                                    color: selectedColor,
                                })
                            }
                            className="flex-row items-center rounded-full bg-black px-8 py-4"
                        >
                            <ShoppingBag
                                size={20}
                                color="#fff"
                            />

                            <Text className="ml-3 text-lg font-semibold text-white">
                                Add to Cart
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}