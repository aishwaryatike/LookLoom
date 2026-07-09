import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthInput from "../../components/AuthInput";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        router.replace("/(tabs)/Home")
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="flex-1 justify-center px-6">
                <View className="mb-10">
                    <Text className="text-4xl font-bold text-gray-900">
                        Hello Again!!
                    </Text>

                    <Text className="mt-2 text-base text-gray-500">
                        Ready to find your next statement piece?
                    </Text>
                </View>

                <AuthInput
                    label="Email"
                    placeholder="you@example.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                <AuthInput
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    onPress={handleLogin}
                    className="mt-3 h-14 items-center justify-center rounded-xl bg-black"
                >
                    <Text className="text-base font-semibold text-white">
                        Login
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.replace("/Auth/SignUp")}
                    className="mt-4 h-14 items-center justify-center rounded-xl border border-gray-300 bg-white"
                >
                    <Text className="text-base font-semibold text-gray-800">
                        Go to Sign Up
                    </Text>
                </TouchableOpacity>

                <Pressable
                    className="mt-10 self-end"
                    onPress={()=>{router.replace("/Auth/ForgotPw")}}

                >
                    <Text>
                        Forgot Password?
                    </Text>
                </Pressable>

            </View>
        </SafeAreaView>
    );
}