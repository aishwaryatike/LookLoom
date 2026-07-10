import CustomHeader from "@/components/CustomHeader";
import ProductFilters, { SortOption } from "@/components/ProductFilters";
import ProductGrid from "@/components/ProductGrid";
import { router } from "expo-router";
import { useMemo, useState } from "react";

export default function HomeScreen() {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState<SortOption>("lowToHigh");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const filteredProducts = useMemo(() => {
        let data = [...PRODUCTS];

        // Search
        if (search.trim()) {
            data = data.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Item Type
        if (selectedTypes.length > 0) {
            data = data.filter((item) => selectedTypes.includes(item.type));
        }

        // Price Sort
        data.sort((a, b) =>
            sort === "lowToHigh" ? a.price - b.price : b.price - a.price
        );

        return data;
    }, [search, selectedTypes, sort]);

    return (
        <>
            <CustomHeader
                userName="Aishwarya"
                avatar="https://i.pravatar.cc/150?img=32"
                onProfilePress={() => router.push("/Profile")}
                onLogoutPress={() => router.push("/Auth/Login")}
            />

            <ProductFilters
                search={search}
                sort={sort}
                selectedTypes={selectedTypes}
                productTypes={PRODUCT_TYPES}
                onSearchChange={setSearch}
                onSortChange={setSort}
                onTypesChange={setSelectedTypes}
            />

            <ProductGrid
                products={filteredProducts}
            />
        </>
    );
}

const PRODUCTS = [
    {
        id: "1",
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
        name: "Modern Light Clothes",
        type: "T-Shirt",
        price: 212.99,
        rating: 5,
    },
    {
        id: "2",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
        name: "Classic Hoodie",
        type: "Hoodie",
        price: 159.99,
        rating: 4.9,
    },
    {
        id: "3",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
        name: "Casual Wear",
        type: "Shirt",
        price: 185.5,
        rating: 4.8,
    },
    {
        id: "4",
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
        name: "Minimal Style",
        type: "Jacket",
        price: 249.99,
        rating: 5,
    },
    {
        id: "5",
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
        name: "Urban Fashion",
        type: "Sweatshirt",
        price: 199.99,
        rating: 4.9,
    },
    {
        id: "6",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
        name: "Everyday Fit",
        type: "T-Shirt",
        price: 99.99,
        rating: 4.7,
    },
];

const PRODUCT_TYPES = [
    "T-Shirt",
    "Hoodie",
    "Jacket",
    "Shirt",
    "Sweatshirt",
    "Pants",
    "Shoes",
];