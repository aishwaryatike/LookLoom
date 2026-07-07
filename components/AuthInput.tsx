import { Text, TextInput, View } from "react-native";

type AuthInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
};

export default function AuthInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
}: AuthInputProps) {
  return (
    <View className="mb-5">
      <Text className="mb-2 text-sm font-medium text-gray-700">
        {label}
      </Text>

      <TextInput
        className="rounded-xl border border-gray-300 bg-white px-4 py-4 text-base text-gray-900"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  );
}