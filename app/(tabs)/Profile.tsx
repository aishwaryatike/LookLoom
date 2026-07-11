import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Address = {
    id: string;
    title: string;
    address: string;
};

export default function ProfileScreen() {
    const [profileImage, setProfileImage] = useState(
        "https://i.pravatar.cc/300"
    );

    const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState("john@example.com");
    const [phone, setPhone] = useState("+91 9876543210");

    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: "1",
            title: "Primary Address",
            address: "221B Baker Street, London",
        },
    ]);

    const pickImage = async (fromCamera: boolean) => {
        try {
            if (fromCamera) {
                const permission =
                    await ImagePicker.requestCameraPermissionsAsync();

                if (!permission.granted) {
                    Alert.alert(
                        "Permission Required",
                        "Camera permission is required."
                    );
                    return;
                }

                const result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ["images"],
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 0.8,
                });

                if (!result.canceled) {
                    setProfileImage(result.assets[0].uri);
                }
            } else {
                const permission =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();

                if (!permission.granted) {
                    Alert.alert(
                        "Permission Required",
                        "Gallery permission is required."
                    );
                    return;
                }

                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ["images"],
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 0.8,
                });

                if (!result.canceled) {
                    setProfileImage(result.assets[0].uri);
                }
            }
        } catch (error) {
            Alert.alert("Error", "Unable to update profile photo.");
        }
    };

    const updatePhoto = () => {
        Alert.alert("Update Profile Photo", "Choose an option", [
            {
                text: "Take Photo",
                onPress: () => pickImage(true),
            },
            {
                text: "Choose from Gallery",
                onPress: () => pickImage(false),
            },
            {
                text: "Cancel",
                style: "cancel",
            },
        ]);
    };

    const addAddress = () => {
        setAddresses((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                title: `Address ${prev.length + 1}`,
                address: "",
            },
        ]);
    };

    const updateAddress = (id: string, value: string) => {
        setAddresses((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, address: value } : item
            )
        );
    };

    return (
        <ScrollView
            className="flex-1 bg-neutral-100"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                padding: 20,
                paddingBottom: 160, // Prevent floating tab overlap
            }}
        >
            {/* PERSONAL INFORMATION */}

            <View className="bg-white rounded-3xl p-5 shadow-sm">
                <Text className="text-lg font-bold text-black mb-5">
                    Personal Information
                </Text>

                <View className="items-center mb-6">
                    <Image
                        source={{ uri: profileImage }}
                        className="w-28 h-28 rounded-full"
                    />

                    <TouchableOpacity
                        onPress={updatePhoto}
                        className="mt-4 bg-black rounded-full px-5 py-3 flex-row items-center"
                    >
                        <Ionicons
                            name="camera-outline"
                            size={18}
                            color="white"
                        />

                        <Text className="text-white font-semibold ml-2">
                            Update Profile Photo
                        </Text>
                    </TouchableOpacity>
                </View>

                <InputField
                    label="Full Name"
                    value={name}
                    onChangeText={setName}
                />

                <InputField
                    label="Email Address"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                <InputField
                    label="Phone Number"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
            </View>

            {/* ADDRESS */}

            <View className="bg-white rounded-3xl p-5 shadow-sm mt-6">
                <View className="flex-row items-center justify-between mb-5">
                    <Text className="text-lg font-bold text-black">
                        Address Information
                    </Text>

                    <TouchableOpacity
                        onPress={addAddress}
                        className="flex-row items-center"
                    >
                        <Ionicons
                            name="add-circle"
                            size={22}
                            color="black"
                        />

                        <Text className="font-semibold ml-1">
                            Add Address
                        </Text>
                    </TouchableOpacity>
                </View>

                {addresses.map((item, index) => (
                    <View key={item.id} className="mb-5">
                        <Text className="font-semibold text-neutral-700 mb-2">
                            {index === 0 ? "Primary Address" : item.title}
                        </Text>

                        <TextInput
                            value={item.address}
                            multiline
                            textAlignVertical="top"
                            placeholder="Enter address"
                            onChangeText={(text) =>
                                updateAddress(item.id, text)
                            }
                            className="border border-neutral-300 rounded-2xl px-4 py-4 text-base min-h-[110px]"
                        />
                    </View>
                ))}
            </View>

            {/* ACCOUNT ACTIONS */}

            <View className="mt-8">
                <Text className="text-lg font-bold text-black mb-4">
                    Account
                </Text>

                <TouchableOpacity
                    className="bg-black rounded-2xl py-4 items-center mb-4"
                    onPress={() => {
                        router.push("/Auth/ResetPw");
                    }}
                >
                    <Text className="text-white font-semibold text-base">
                        Reset Password
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="border border-black rounded-2xl py-4 items-center mb-4"
                    onPress={() => {
                        router.push("/Auth/ForgotPw");
                    }}
                >
                    <Text className="text-black font-semibold text-base">
                        Forgot Password
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-red-500 rounded-2xl py-4 items-center"
                    onPress={() => {
                        router.push("/Auth/Login");
                    }}
                >
                    <Text className="text-white font-semibold text-base">
                        Sign Out
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

type InputFieldProps = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    keyboardType?: any;
};

function InputField({
    label,
    value,
    onChangeText,
    keyboardType = "default",
}: InputFieldProps) {
    return (
        <View className="mb-4">
            <Text className="text-neutral-700 font-medium mb-2">
                {label}
            </Text>

            <TextInput
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                placeholder={label}
                className="border border-neutral-300 rounded-2xl px-4 py-4 text-base bg-white"
            />
        </View>
    );
}