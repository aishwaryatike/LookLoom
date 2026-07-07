import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {

useEffect(() => {
    async function prepare() {
      // Wait for 3 seconds
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Hide the splash screen
      await SplashScreen.hideAsync();
    }

    prepare();
  }, []);

  return <Stack screenOptions={{ headerShown: false}} />;
}
