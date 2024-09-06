import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useMemo, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "../constants/theme";
import { ThemeContext } from "../constants/themeContext";
import { StatusBar } from "expo-status-bar";
import { setBackgroundColorAsync } from "expo-system-ui";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  const colorScheme = useColorScheme();
  const [isDarkMode, setDarkMode] = useState(colorScheme === "dark");
  const theme = useMemo(
    () => (isDarkMode ? darkTheme : lightTheme),
    [isDarkMode]
  );

  const [loaded, error] = useFonts({
    "Mulish-Regular400": require("../assets/fonts/Mulish-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Update the theme based on colorScheme changes
  useEffect(() => {
    setDarkMode(colorScheme === "dark");
  }, [colorScheme]);

  if (!loaded && !error) {
    return null;
  }

  setBackgroundColorAsync(theme.colors.background);

  return (
    <ThemeContext.Provider value={theme}>
      <StatusBar backgroundColor={theme.colors.background} />
      <Stack>
        <Stack.Screen name="+not-found" />
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeContext.Provider>
  );
}

export default function RootLayout() {
  return <RootLayoutContent />;
}
