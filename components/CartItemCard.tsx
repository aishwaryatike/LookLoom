// components/CartItemCard.tsx

import {
    Heart,
    Minus,
    MoreVertical,
    Plus,
} from "lucide-react-native";
import { useState } from "react";
import {
    Image,
    Modal,
    Pressable,
    Text,
    View,
} from "react-native";

type Props = {
    image: string;
    name: string;
    type: string;
    price: number;

    mode?: "cart" | "favorite";

    quantity?: number;
    isFavorite?: boolean;

    onIncrease?: () => void;
    onDecrease?: () => void;
    onFavoritePress?: () => void;
    onMoveToFavorite?: () => void;
    onRemove?: () => void;
};

export default function CartItemCard({
    image,
    name,
    type,
    price,
    quantity = 1,
    isFavorite = false,
    mode = "cart",

    onIncrease,
    onDecrease,
    onFavoritePress,
    onMoveToFavorite,
    onRemove,
}: Props) {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            <View className="mb-4 flex-row items-center rounded-3xl bg-white p-4">
                {/* Product Image */}
                <View className="w-[20%]">
                    <Image
                        source={{ uri: image }}
                        resizeMode="cover"
                        className="aspect-square w-full rounded-2xl"
                    />
                </View>

                {/* Product Details */}
                <View className="w-[60%] px-4">
                    <Text
                        numberOfLines={1}
                        className="text-lg font-bold text-black"
                    >
                        {name}
                    </Text>

                    <Text
                        numberOfLines={1}
                        className="mt-1 text-sm text-neutral-400"
                    >
                        {type}
                    </Text>

                    <Text className="mt-3 text-xl font-bold text-black">
                        ${price.toFixed(2)}
                    </Text>
                </View>

                {/* Actions */}
                <View className="w-[20%] items-end justify-between self-stretch">
                    {mode === "cart" ? (
                        <>
                            <View className="flex-row items-center rounded-full bg-neutral-100 px-2 py-1">
                                <Pressable onPress={onDecrease}>
                                    <Minus
                                        size={16}
                                        color="#000"
                                    />
                                </Pressable>

                                <Text className="mx-3 font-semibold">
                                    {quantity}
                                </Text>

                                <Pressable onPress={onIncrease}>
                                    <Plus
                                        size={16}
                                        color="#000"
                                    />
                                </Pressable>
                            </View>

                            <Pressable
                                onPress={() => setShowMenu(true)}
                                className="mt-auto rounded-full p-2"
                            >
                                <MoreVertical size={22} />
                            </Pressable>
                        </>
                    ) : (
                        <Pressable
                            onPress={onFavoritePress}
                            className="rounded-full bg-black p-3"
                        >
                            <Heart
                                size={20}
                                color="white"
                                fill={
                                    isFavorite
                                        ? "white"
                                        : "transparent"
                                }
                            />
                        </Pressable>
                    )}
                </View>
            </View>

            {/* Action Menu */}
            <Modal
                visible={showMenu}
                transparent
                animationType="fade"
                onRequestClose={() => setShowMenu(false)}
            >
                <Pressable
                    className="flex-1 bg-black/20"
                    onPress={() => setShowMenu(false)}
                >
                    <View className="absolute bottom-10 right-5 w-56 overflow-hidden rounded-3xl bg-white">
                        <Pressable
                            onPress={() => {
                                setShowMenu(false);
                                onMoveToFavorite?.();
                            }}
                            className="border-b border-neutral-200 px-5 py-4"
                        >
                            <Text className="text-base font-medium">
                                Move to Favorite
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={() => {
                                setShowMenu(false);
                                onRemove?.();
                            }}
                            className="px-5 py-4"
                        >
                            <Text className="text-base font-medium text-red-500">
                                Remove from Cart
                            </Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}