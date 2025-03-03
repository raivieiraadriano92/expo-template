import { useRef, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { useColorScheme } from "~/lib/useColorScheme";

export const useLoadColorScheme = () => {
  const hasMounted = useRef(false);

  const { colorScheme, isDarkColorScheme, setColorScheme } = useColorScheme();

  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  const loadColorScheme = async () => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }

    const savedColorScheme = (await AsyncStorage.getItem(
      "colorScheme"
    )) as typeof colorScheme;

    if (!savedColorScheme) {
      AsyncStorage.setItem("colorScheme", colorScheme);
    }

    if (savedColorScheme && savedColorScheme !== colorScheme) {
      setColorScheme(savedColorScheme);

      setAndroidNavigationBar(savedColorScheme);
    } else {
      setAndroidNavigationBar(colorScheme);
    }

    setIsColorSchemeLoaded(true);

    hasMounted.current = true;
  };

  useIsomorphicLayoutEffect(() => {
    loadColorScheme();
  }, []);

  return { isColorSchemeLoaded, isDarkColorScheme };
};
