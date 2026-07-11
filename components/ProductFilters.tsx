// components/ProductFilters.tsx

import { ArrowUpDown, Search, X } from "lucide-react-native";
import { useState } from "react";
import {
    Modal,
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
            onTypesChange(selectedTypes.filter((x) => x !== type));
        } else {
            onTypesChange([...selectedTypes, type]);
        }
    };

    return (
        <>
            <View className="bg-white px-5 pt-4 pb-3">
                {/* Search + Sort */}
                <View className="flex-row items-center">
                    <View className="mr-3 flex-1 flex-row items-center rounded-2xl bg-neutral-100 px-4 py-3">
                        <Search
                            size={20}
                            color="#737373"
                        />

                        <TextInput
                            value={search}
                            onChangeText={onSearchChange}
                            placeholder="Search products..."
                            placeholderTextColor="#9CA3AF"
                            className="ml-3 flex-1 text-base text-black"
                        />
                    </View>

                    <Pressable
                        onPress={() => setShowDropdown(true)}
                        className="h-14 w-14 items-center justify-center rounded-2xl bg-black"
                    >
                        <ArrowUpDown
                            size={22}
                            color="white"
                        />
                    </Pressable>
                </View>

                {/* Product Types */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: 18,
                        paddingBottom: 4,
                    }}
                >
                    {productTypes.map((type) => {
                        const selected = selectedTypes.includes(type);

                        return (
                            <Pressable
                                key={type}
                                onPress={() => toggleType(type)}
                                className={`mr-3 rounded-full px-5 py-3 ${selected ? "bg-black" : "bg-neutral-100"
                                    }`}
                            >
                                <Text
                                    className={`font-medium ${selected ? "text-white" : "text-neutral-700"
                                        }`}
                                >
                                    {type}
                                </Text>
                            </Pressable>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Dropdown Modal */}
            <Modal
                visible={showDropdown}
                transparent
                animationType="fade"
                onRequestClose={() => setShowDropdown(false)}
            >
                <Pressable
                    className="flex-1 bg-black/20"
                    onPress={() => setShowDropdown(false)}
                >
                    <View className="absolute right-5 top-32 w-52 overflow-hidden rounded-2xl bg-white shadow-lg">
                        <View className="flex-row items-center justify-between border-b border-neutral-200 px-4 py-3">
                            <Text className="text-base font-semibold">
                                Sort Price
                            </Text>

                            <Pressable onPress={() => setShowDropdown(false)}>
                                <X
                                    size={18}
                                    color="#444"
                                />
                            </Pressable>
                        </View>

                        <Pressable
                            className={`px-4 py-4 ${sort === "lowToHigh" ? "bg-neutral-100" : ""
                                }`}
                            onPress={() => {
                                onSortChange("lowToHigh");
                                setShowDropdown(false);
                            }}
                        >
                            <Text className="text-base">Low → High</Text>
                        </Pressable>

                        <Pressable
                            className={`px-4 py-4 ${sort === "highToLow" ? "bg-neutral-100" : ""
                                }`}
                            onPress={() => {
                                onSortChange("highToLow");
                                setShowDropdown(false);
                            }}
                        >
                            <Text className="text-base">High → Low</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}