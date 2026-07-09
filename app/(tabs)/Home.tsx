import CustomHeader from "@/components/CustomHeader";
import { router } from "expo-router";

export default function HomeScreen() {
    return (
        <CustomHeader
            userName="Aishwarya"
            avatar="https://i.pravatar.cc/150?img=32"
            onProfilePress={() => router.push("/Profile")}
            onLogoutPress={() => router.push("/Auth/Login")}
        />
    );
}