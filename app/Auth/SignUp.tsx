import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthInput from "../../components/AuthInput";

export default function SignupScreen() {
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = () => {
        router.replace("/Auth/VerifyOTP")
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="flex-1 justify-center px-6">
                {/* Header */}
                <View className="mb-10">
                    <Text className="text-4xl font-bold text-gray-900">
                        Let's weave your style!
                    </Text>

                    <Text className="mt-2 text-base text-gray-500">
                        Craft your signature look
                    </Text>
                </View>

                {/* Email */}
                <AuthInput
                    label="Email"
                    placeholder="you@example.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                {/* Mobile */}
                <AuthInput
                    label="Mobile Number"
                    placeholder="+91 9876543210"
                    value={mobile}
                    onChangeText={setMobile}
                    keyboardType="default"
                />

                {/* Password */}
                <AuthInput
                    label="Password"
                    placeholder="Create a password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                {/* Confirm Password */}
                <AuthInput
                    label="Confirm Password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

                {/* Sign Up Button */}
                <TouchableOpacity
                    onPress={handleSignup}
                    className="mt-3 h-14 items-center justify-center rounded-xl bg-black"
                >
                    <Text className="text-base font-semibold text-white">
                        Sign Up
                    </Text>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity
                    onPress={() => router.replace("/Auth/Login")}
                    className="mt-4 h-14 items-center justify-center rounded-xl border border-gray-300 bg-white"
                >
                    <Text className="text-base font-semibold text-gray-800">
                        Already have an account? Login
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}