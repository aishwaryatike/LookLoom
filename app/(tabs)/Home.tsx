import CustomHeader from "@/components/CustomHeader";
import ProductGrid from "@/components/ProductGrid";
import { router } from "expo-router";
import { useState } from "react";

export default function HomeScreen() {
    const [filters, setFilters] = useState({
        search: "",
        minPrice: undefined,
        maxPrice: undefined,
        itemTypes: [],
    });
    return (
        <>
            <CustomHeader

                userName="Aishwarya"
                avatar="https://i.pravatar.cc/150?img=32"
                onProfilePress={() => router.push("/Profile")}
                onLogoutPress={() => router.push("/Auth/Login")}
            />
            <ProductGrid
                products={PRODUCTS}
                filters={filters}
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

