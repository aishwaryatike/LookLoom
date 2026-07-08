import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthInput from "../../components/AuthInput";
import OTPInput from "../../components/OTPInput";

export default function ForgotPasswordScreen() {
    const [step, setStep] = useState<"email" | "otp">("email");

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const [timer, setTimer] = useState(30);

    useEffect(() => {
        if (step !== "otp" || timer === 0) return;

        const interval = setInterval(() => {
            setTimer((t) => t - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [step, timer]);

    const handleSendOTP = () => {
        // TODO:
        // Call forgot password API

        console.log("Send OTP to:", email);

        setStep("otp");
        setTimer(30);
    };

    const handleVerifyOTP = () => {
        // TODO:
        // Verify OTP API

        console.log("Verify:", otp);

        router.push("/Auth/ResetPw");
    };

    const handleResendOTP = () => {
        // TODO:
        // Resend OTP API

        setTimer(30);
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="flex-1 justify-center px-6">

                <View className="mb-10">
                    <Text className="text-4xl font-bold text-gray-900">
                        Forgot Password
                    </Text>

                    <Text className="mt-2 text-base text-gray-500">
                        {step === "email"
                            ? "Enter your registered email to receive a verification code."
                            : `Enter the 6-digit code sent to ${email}`}
                    </Text>
                </View>

                {step === "email" ? (
                    <>
                        <AuthInput
                            label="Email"
                            placeholder="you@example.com"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />

                        <TouchableOpacity
                            className="mt-3 h-14 items-center justify-center rounded-xl bg-black"
                            onPress={handleSendOTP}
                        >
                            <Text className="font-semibold text-white">
                                Send OTP
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => router.replace("/Auth/Login")}
                            className="mt-4 h-14 items-center justify-center rounded-xl border border-gray-300 bg-white"
                        >
                            <Text className="text-base font-semibold text-gray-800">
                                Go Back
                            </Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <OTPInput
                            value={otp}
                            onChangeText={setOtp}
                        />

                        <TouchableOpacity
                            className="h-14 items-center justify-center rounded-xl bg-black"
                            onPress={handleVerifyOTP}
                        >
                            <Text className="font-semibold text-white">
                                Verify OTP
                            </Text>
                        </TouchableOpacity>

                        {timer > 0 ? (
                            <Text className="mt-6 text-center text-gray-500">
                                Resend OTP in {timer}s
                            </Text>
                        ) : (
                            <TouchableOpacity
                                className="mt-6"
                                onPress={handleResendOTP}
                            >
                                <Text className="text-center font-semibold text-black">
                                    Resend OTP
                                </Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            className="mt-8"
                            onPress={() => setStep("email")}
                        >
                            <Text className="text-center text-gray-600">
                                Change Email
                            </Text>
                        </TouchableOpacity>
                    </>
                )}

            </View>
        </SafeAreaView>
    );
}