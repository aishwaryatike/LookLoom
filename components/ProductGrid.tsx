// components/ProductGrid.tsx

import { useMemo } from "react";
import {
    Dimensions,
    FlatList,
    View,
} from "react-native";
import ProductCard from "./ProductCard";

const { width } = Dimensions.get("window");

const SPACING = 16;
const CONTAINER_PADDING = 20;
const CARD_WIDTH = (width - CONTAINER_PADDING * 2 - SPACING) / 2;

export type Product = {
    id: string;
    image: string;
    name: string;
    type: string;
    price: number;
    rating: number;
    isFavorite?: boolean;
};

export type ProductFilters = {
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    itemTypes?: string[];
};

type Props = {
    products: Product[];
    filters?: ProductFilters;
};

export default function ProductGrid({
    products,
    filters,
}: Props) {
    const filteredProducts = useMemo(() => {
        let data = [...products];

        // Search by name
        if (filters?.search?.trim()) {
            const keyword = filters.search.toLowerCase();

            data = data.filter((item) =>
                item.name.toLowerCase().includes(keyword)
            );
        }

        // Price filter
        if (filters?.minPrice !== undefined) {
            data = data.filter(
                (item) => item.price >= filters.minPrice!
            );
        }

        if (filters?.maxPrice !== undefined) {
            data = data.filter(
                (item) => item.price <= filters.maxPrice!
            );
        }

        // Item Type filter
        if (filters?.itemTypes?.length) {
            data = data.filter((item) =>
                filters.itemTypes!
                    .map((x) => x.toLowerCase())
                    .includes(item.type.toLowerCase())
            );
        }

        return data;
    }, [products, filters]);

    return (
        <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: CONTAINER_PADDING,
                paddingTop: 20,
                paddingBottom: 120,
            }}
            columnWrapperStyle={{
                justifyContent: "space-between",
            }}
            renderItem={({ item, index }) => {
                const isOffset =
                    index % 4 === 1 || index % 4 === 2;

                return (
                    <View
                        style={{
                            width: CARD_WIDTH,
                            marginTop: isOffset ? 42 : 0,
                            marginBottom: 16,
                        }}
                    >
                        <ProductCard
                            image={item.image}
                            name={item.name}
                            type={item.type}
                            price={item.price}
                            rating={item.rating}
                            isFavorite={item.isFavorite}
                        />
                    </View>
                );
            }}
        />
    );
}