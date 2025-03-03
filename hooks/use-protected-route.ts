import { useEffect, useState } from "react";

import { useRouter, useSegments } from "expo-router";

import { useAuthStore } from "~/store/auth-store";

export function useProtectedRoute() {
  const router = useRouter();

  const segments = useSegments();

  const userId = useAuthStore((state) => state.session?.user.id);

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const inProtectedGroup = segments[0] === "(protected)";

    if (!isInitialized) {
      setIsInitialized(true);

      return;
    }

    if (userId && !inProtectedGroup) {
      // User is authenticated and trying to access public routes
      router.replace("/(protected)/(tabs)/home");
    } else if (!userId && inProtectedGroup) {
      // User is not authenticated and trying to access protected routes
      router.replace("/");
    }
  }, [isInitialized, router, segments, userId]);

  return {
    isInitialized,
    isAuthenticated: !!userId
  };
}
