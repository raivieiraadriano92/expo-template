import { useRef, useState } from "react";

import { Platform } from "react-native";

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { useColorScheme } from "~/lib/useColorScheme";

export const useLoadColorScheme = () => {
  const hasMounted = useRef(false);

  const { colorScheme, isDarkColorScheme } = useColorScheme();

  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

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
  }, []);

  return { isColorSchemeLoaded, isDarkColorScheme };
};
