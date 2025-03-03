import "~/global.css";

import { useEffect } from "react";

import {
  Theme,
  ThemeProvider,
  DefaultTheme,
  DarkTheme
} from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";
import { Stack, useNavigationContainerRef } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import { useLoadColorScheme } from "~/hooks/useLoadColorScheme";
import { NAV_THEME } from "~/lib/constants";
import { initSentry, navigationIntegration } from "~/services/sentry";
import { initVexo } from "~/services/vexo";

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
  initialRouteName: "(tabs)"
};

initVexo();

initSentry();

function RootLayout() {
  // Capture the NavigationContainer ref and register it with the integration.
  const ref = useNavigationContainerRef();

  const { isColorSchemeLoaded, isDarkColorScheme } = useLoadColorScheme();

  useEffect(() => {
    if (ref?.current) {
      navigationIntegration.registerNavigationContainer(ref);
    }
  }, [ref]);

  useEffect(() => {
    if (isColorSchemeLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isColorSchemeLoaded, isDarkColorScheme]);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ title: "Main" }} />
        <Stack.Screen name="+not-found" options={{ title: "Oops!" }} />
      </Stack>
    </ThemeProvider>
  );
}

export default __DEV__ ? RootLayout : Sentry.wrap(RootLayout);
