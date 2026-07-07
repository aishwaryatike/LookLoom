import { TextInput, View } from "react-native";

type OTPInputProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function OTPInput({
  value,
  onChangeText,
}: OTPInputProps) {
  return (
    <View className="mb-8">
      <TextInput
        className="rounded-xl border border-gray-300 bg-white px-4 py-4 text-center text-2xl font-semibold tracking-[14px] text-gray-900"
        placeholder="------"
        placeholderTextColor="#9CA3AF"
        keyboardType="number-pad"
        maxLength={6}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}