import "~/global.css";

import * as React from "react";

import {
  Theme,
  ThemeProvider,
  DefaultTheme,
  DarkTheme
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, ...NAV_THEME.light }
};

const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, ...NAV_THEME.dark }
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 500,
  fade: true
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index"
};

export default function RootLayout() {
  const hasMounted = React.useRef(false);

  const { colorScheme, isDarkColorScheme } = useColorScheme();

  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }

    setAndroidNavigationBar(colorScheme);

    setIsColorSchemeLoaded(true);

    hasMounted.current = true;

    SplashScreen.hideAsync();
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, title: "Main" }}
        />
        <Stack.Screen name="+not-found" options={{ title: "Oops!" }} />
      </Stack>
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;
