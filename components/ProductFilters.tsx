// components/ProductFilters.tsx

import { ArrowUpDown, Search } from "lucide-react-native";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

export type SortOption = "lowToHigh" | "highToLow";

type Props = {
    search: string;
    sort: SortOption;
    selectedTypes: string[];
    productTypes: string[];

    onSearchChange: (value: string) => void;
    onSortChange: (value: SortOption) => void;
    onTypesChange: (types: string[]) => void;
};

export default function ProductFilters({
    search,
    sort,
    selectedTypes,
    productTypes,
    onSearchChange,
    onSortChange,
    onTypesChange,
}: Props) {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleType = (type: string) => {
        if (selectedTypes.includes(type)) {
            onTypesChange(
                selectedTypes.filter((item) => item !== type)
            );
        } else {
            onTypesChange([...selectedTypes, type]);
        }
    };

    return (
        <View className="px-5 pt-4 pb-2 bg-white">
            {/* Search + Sort */}
            <View className="flex-row items-center">
                {/* Search */}
                <View className="mr-3 flex-1 flex-row items-center rounded-2xl bg-neutral-100 px-4 py-3">
                    <Search size={20} color="#737373" />

                    <TextInput
                        value={search}
                        onChangeText={onSearchChange}
                        placeholder="Search products..."
                        placeholderTextColor="#9CA3AF"
                        className="ml-3 flex-1 text-base text-black"
                    />
                </View>

                {/* Sort */}
                <View className="relative">
                    <Pressable
                        onPress={() =>
                            setShowDropdown((prev) => !prev)
                        }
                        className="h-14 w-14 items-center justify-center rounded-2xl bg-black"
                    >
                        <ArrowUpDown
                            size={22}
                            color="#FFFFFF"
                        />
                    </Pressable>

                    {showDropdown && (
                        <View className="absolute right-0 top-16 z-50 w-44 overflow-hidden rounded-2xl bg-white shadow">
                            <Pressable
                                onPress={() => {
                                    onSortChange("lowToHigh");
                                    setShowDropdown(false);
                                }}
                                className={`px-4 py-4 ${sort === "lowToHigh"
                                        ? "bg-neutral-100"
                                        : ""
                                    }`}
                            >
                                <Text className="text-base font-medium text-black">
                                    Low to High
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={() => {
                                    onSortChange("highToLow");
                                    setShowDropdown(false);
                                }}
                                className={`px-4 py-4 ${sort === "highToLow"
                                        ? "bg-neutral-100"
                                        : ""
                                    }`}
                            >
                                <Text className="text-base font-medium text-black">
                                    High to Low
                                </Text>
                            </Pressable>
                        </View>
                    )}
                </View>
            </View>

            {/* Product Type Filter */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 18,
                    paddingBottom: 6,
                }}
            >
                {productTypes.map((type) => {
                    const selected =
                        selectedTypes.includes(type);

                    return (
                        <Pressable
                            key={type}
                            onPress={() => toggleType(type)}
                            className={`mr-3 rounded-full px-5 py-3 ${selected
                                    ? "bg-black"
                                    : "bg-neutral-100"
                                }`}
                        >
                            <Text
                                className={`font-medium ${selected
                                        ? "text-white"
                                        : "text-neutral-700"
                                    }`}
                            >
                                {type}
                            </Text>
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View>
    );
}