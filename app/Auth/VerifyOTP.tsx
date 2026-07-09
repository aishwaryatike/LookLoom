import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OTPInput from "../../components/OTPInput";

export default function VerifyOTPScreen() {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = () => {
    console.log("OTP:", otp);
    // Verify OTP API
    // router.replace("/home");
  };

  const handleResend = () => {
    console.log("Resend OTP");
    setTimer(30);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center px-6">

        <View className="mb-10">
          <Text className="text-4xl font-bold text-gray-900">
            Verify Account
          </Text>

          <Text className="mt-2 text-base leading-6 text-gray-500">
            We've sent a 6-digit verification code to your email or mobile
            number. Enter it below to activate your account.
          </Text>
        </View>

        <OTPInput
          value={otp}
          onChangeText={setOtp}
        />

        <TouchableOpacity
          className="h-14 items-center justify-center rounded-xl bg-black"
          onPress={handleVerify}
        >
          <Text className="text-base font-semibold text-white">
            Verify OTP
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-4 h-14 items-center justify-center rounded-xl border border-gray-300 bg-white"
          onPress={() => router.replace("/Auth/SignUp")}
        >
          <Text className="text-base font-semibold text-gray-800">
            Edit Email / Mobile
          </Text>
        </TouchableOpacity>

        <View className="mt-8 items-center">
          {timer > 0 ? (
            <Text className="text-gray-500">
              Resend OTP in {timer}s
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text className="font-semibold text-black">
                Resend OTP
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}