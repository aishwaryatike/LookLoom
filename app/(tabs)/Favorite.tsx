// app/(tabs)/favorite.tsx

import CartItemCard from "@/components/CartItemCard";
import { FlatList, SafeAreaView, Text, View } from "react-native";

const FAVORITES = [
    {
        id: "1",
        image:
            "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
        name: "Modern Light Clothes",
        type: "T-Shirt",
        price: 212.99,
        isFavorite: true,
    },
    {
        id: "2",
        image:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b",
        name: "Classic Hoodie",
        type: "Hoodie",
        price: 159.99,
        isFavorite: true,
    },
    {
        id: "3",
        image:
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
        name: "Casual Wear",
        type: "Shirt",
        price: 185.5,
        isFavorite: true,
    },
    {
        id: "4",
        image:
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
        name: "Minimal Style",
        type: "Jacket",
        price: 249.99,
        isFavorite: true,
    },
];

export default function FavoriteScreen() {
    return (
        <SafeAreaView className="flex-1 bg-neutral-50">
            <View className="px-5 pt-5 pb-3">
                <Text className="text-3xl font-bold text-black">
                    Favorites
                </Text>

                <Text className="mt-1 text-base text-neutral-500">
                    {FAVORITES.length} saved items
                </Text>
            </View>

            <FlatList
                data={FAVORITES}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 120,
                    paddingTop: 10,
                }}
                ItemSeparatorComponent={() => (
                    <View className="h-4" />
                )}
                renderItem={({ item }) => (
                    <CartItemCard
                        mode="favorite"
                        image={item.image}
                        name={item.name}
                        type={item.type}
                        price={item.price}
                        isFavorite={item.isFavorite}
                        onFavoritePress={() => {
                            console.log("Toggle Favorite:", item.id);
                        }}
                    />
                )}
            />
        </SafeAreaView>
    );
}