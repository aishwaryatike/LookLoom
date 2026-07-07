import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthInput from "../../components/AuthInput";

export default function ResetPasswordScreen() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleResetPassword = () => {
        // TODO:
        // Reset password API

        console.log(password, confirmPassword);

        router.replace("/Auth/Login");
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="flex-1 justify-center px-6">

                <View className="mb-10">
                    <Text className="text-4xl font-bold text-gray-900">
                        Reset Password
                    </Text>

                    <Text className="mt-2 text-base text-gray-500">
                        Create a new password for your account.
                    </Text>
                </View>

                <AuthInput
                    label="New Password"
                    placeholder="Enter new password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <AuthInput
                    label="Confirm Password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    className="mt-3 h-14 items-center justify-center rounded-xl bg-black"
                    onPress={handleResetPassword}
                >
                    <Text className="font-semibold text-white">
                        Reset Password
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.replace("/Auth/Login")}
                    className="mt-4 h-14 items-center justify-center rounded-xl border border-gray-300 bg-white"
                >
                    <Text className="text-base font-semibold text-gray-800">
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}