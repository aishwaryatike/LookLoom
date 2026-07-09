import { Tabs } from "expo-router";
import {
    Heart,
    House,
    ShoppingCart,
    User,
} from "lucide-react-native";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,

                tabBarShowLabel: true,

                tabBarActiveTintColor: "#FFFFFF",
                tabBarInactiveTintColor: "#8E8E93",

                tabBarStyle: {
                    position: "absolute",
                    left: 20,
                    right: 20,
                    bottom: 24,

                    height: 72,

                    backgroundColor: "#000",
                    borderRadius: 36,

                    borderTopWidth: 0,

                    elevation: 10,
                    shadowColor: "#000",
                    shadowOpacity: 0.18,
                    shadowRadius: 16,
                    shadowOffset: {
                        width: 0,
                        height: 8,
                    },

                    paddingBottom: 10,
                    paddingTop: 10,
                },

                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                    marginTop: 2,
                },
            }}
        >
            <Tabs.Screen
                name="Home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <House
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="Cart"
                options={{
                    title: "Cart",
                    tabBarIcon: ({ color, size }) => (
                        <ShoppingCart
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="Favorite"
                options={{
                    title: "Favorite",
                    tabBarIcon: ({ color, size }) => (
                        <Heart
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="Profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <User
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}