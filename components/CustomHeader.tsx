import { ChevronRight, LogOut } from "lucide-react-native";
import { useState } from "react";
import {
    Image,
    Modal,
    Pressable,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";

type CustomHeaderProps = {
    userName: string;
    avatar: string;
    onProfilePress: () => void;
    onLogoutPress: () => void;
};

export default function CustomHeader({
    userName,
    avatar,
    onProfilePress,
    onLogoutPress,
}: CustomHeaderProps) {
    const [menuVisible, setMenuVisible] = useState(false);

    const greeting = () => {
        const hour = new Date().getHours();

        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        if (hour < 21) return "Good Evening";

        return "Good Night";
    };

    return (
        <>
            <View className="flex-row items-center justify-between px-6 py-4 bg-white">
                <View>
                    <Text className="text-gray-500 text-sm">{greeting()}</Text>

                    <Text className="text-2xl font-bold text-black mt-1">
                        {userName}
                    </Text>
                </View>

                <Pressable onPress={() => setMenuVisible(true)}>
                    <Image
                        source={{ uri: avatar }}
                        className="w-12 h-12 rounded-full"
                    />
                </Pressable>
            </View>

            <Modal
                visible={menuVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setMenuVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
                    <View className="flex-1 bg-black/20">
                        <TouchableWithoutFeedback>
                            <View className="absolute right-6 top-24 w-56 rounded-2xl bg-white shadow-lg overflow-hidden">
                                <Pressable
                                    className="flex-row items-center justify-between px-5 py-4"
                                    onPress={() => {
                                        setMenuVisible(false);
                                        onProfilePress();
                                    }}
                                >
                                    <Text className="text-base font-medium text-black">
                                        Go to Profile
                                    </Text>

                                    <ChevronRight size={18} color="#6B7280" />
                                </Pressable>

                                <View className="h-px bg-gray-200" />

                                <Pressable
                                    className="flex-row items-center px-5 py-4"
                                    onPress={() => {
                                        setMenuVisible(false);
                                        onLogoutPress();
                                    }}
                                >
                                    <LogOut size={18} color="#EF4444" />

                                    <Text className="ml-3 text-base font-medium text-red-500">
                                        Logout
                                    </Text>
                                </Pressable>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
}