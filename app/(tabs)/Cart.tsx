import CartItemCard from "@/components/CartItemCard";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useMemo, useState } from "react";
import {
    FlatList,
    Pressable,
    SafeAreaView,
    Text,
    View,
} from "react-native";

const SHIPPING = 15;
const DISCOUNT = 20;

export default function CartScreen() {
    const [items, setItems] = useState(CART_ITEMS);

    const increase = (id: string) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );
    };

    const decrease = (id: string) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: Math.max(
                            1,
                            item.quantity - 1
                        ),
                    }
                    : item
            )
        );
    };

    const remove = (id: string) => {
        setItems((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    const subtotal = useMemo(
        () =>
            items.reduce(
                (sum, item) =>
                    sum + item.price * item.quantity,
                0
            ),
        [items]
    );

    const total = subtotal + SHIPPING - DISCOUNT;

    return (
        <SafeAreaView className="flex-1 bg-neutral-50">
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    padding: 20,
                    paddingBottom: 150,
                }}
                ListHeaderComponent={
                    <View className="mb-6 flex-row items-center">
                        <Pressable
                            onPress={() => router.back()}
                            className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-white"
                        >
                            <ArrowLeft size={22} />
                        </Pressable>

                        <View>
                            <Text className="text-3xl font-bold">
                                My Cart
                            </Text>

                            <Text className="mt-1 text-base text-neutral-500">
                                {items.length} Items
                            </Text>
                        </View>
                    </View>
                }
                ItemSeparatorComponent={() => (
                    <View className="h-4" />
                )}
                renderItem={({ item }) => (
                    <CartItemCard
                        mode="cart"
                        image={item.image}
                        name={item.name}
                        type={item.type}
                        price={item.price}
                        quantity={item.quantity}
                        onIncrease={() =>
                            increase(item.id)
                        }
                        onDecrease={() =>
                            decrease(item.id)
                        }
                        onMoveToFavorite={() =>
                            console.log(item.id)
                        }
                        onRemove={() =>
                            remove(item.id)
                        }
                    />
                )}
                ListFooterComponent={
                    <View className="mt-6 rounded-3xl bg-white p-6">
                        <Text className="text-xl font-bold">
                            Shipping Information
                        </Text>

                        <View className="mt-4 rounded-2xl bg-neutral-100 p-4">
                            <Text className="text-sm text-neutral-500">
                                Delivery Address
                            </Text>

                            <Text className="mt-2 font-semibold">
                                221B Baker Street
                            </Text>

                            <Text className="font-semibold">
                                London, United Kingdom
                            </Text>
                        </View>

                        <View className="mt-8">
                            <PriceRow
                                title="Shipping Fee"
                                value={SHIPPING}
                            />

                            <PriceRow
                                title="Discount"
                                value={-DISCOUNT}
                            />

                            <View className="my-5 h-px bg-neutral-200" />

                            <PriceRow
                                title="Subtotal"
                                value={subtotal}
                            />

                            <View className="mt-4 flex-row justify-between">
                                <Text className="text-2xl font-bold">
                                    Total
                                </Text>

                                <Text className="text-2xl font-bold">
                                    ${total.toFixed(2)}
                                </Text>
                            </View>
                        </View>
                    </View>
                }
            />

            <View className="absolute bottom-0 left-0 right-0 border-t border-neutral-200 bg-white px-5 py-5">
                <Pressable className="items-center rounded-full bg-black py-5">
                    <Text className="text-lg font-bold text-white">
                        Pay ${total.toFixed(2)}
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

function PriceRow({
    title,
    value,
}: {
    title: string;
    value: number;
}) {
    return (
        <View className="mb-4 flex-row justify-between">
            <Text className="text-base text-neutral-500">
                {title}
            </Text>

            <Text className="text-lg font-semibold">
                {value < 0
                    ? `-$${Math.abs(value).toFixed(2)}`
                    : `$${value.toFixed(2)}`}
            </Text>
        </View>
    );
}

const CART_ITEMS = [
    {
        id: "1",
        image:
            "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
        name: "Modern Light Clothes",
        type: "T-Shirt",
        price: 212.99,
        quantity: 1,
    },
    {
        id: "2",
        image:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b",
        name: "Classic Hoodie",
        type: "Hoodie",
        price: 159.99,
        quantity: 2,
    },
    {
        id: "3",
        image:
            "https://images.unsplash.com/photo-1515886657613-9f3515b0a15ec3261c",
        name: "Urban Fashion",
        type: "Sweatshirt",
        price: 199.99,
        quantity: 1,
    },
];