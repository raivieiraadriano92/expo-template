import { useEffect, useState } from "react";

import {
  GoogleSignin
  // statusCodes
} from "@react-native-google-signin/google-signin";
import * as Sentry from "@sentry/react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { Platform } from "react-native";

import { supabase } from "~/services/supabase";

const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

if (!webClientId) {
  throw new Error("Missing env var: EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID");
}

export function useSignIn({ onError }: { onError: (e: unknown) => void }) {
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({
    apple: false,
    google: false,
    anonymous: false
  });

  const signInWithApple = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, apple: true }));

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      });

      // Sign in via Supabase Auth.
      if (credential.identityToken) {
        const { error } = await supabase.auth.signInWithIdToken({
          provider: "apple",
          token: credential.identityToken
        });

        if (error) throw error;
      } else {
        throw new Error("No identityToken.");
      }
    } catch (e) {
      // if (e.code === "ERR_REQUEST_CANCELED") {
      //   // handle that the user canceled the sign-in flow
      // } else {
      //   // handle other errors
      // }

      onError(e);
    } finally {
      setIsLoading((prev) => ({ ...prev, apple: false }));
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, google: true }));

      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();

      if (userInfo.data?.idToken) {
        const { error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.data.idToken
        });

        if (error) throw error;
      } else {
        throw new Error("no ID token present!");
      }
    } catch (e) {
      Sentry.captureException(e);
      // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //   // user cancelled the login flow
      // } else if (error.code === statusCodes.IN_PROGRESS) {
      //   // operation (e.g. sign in) is in progress already
      // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   // play services not available or outdated
      // } else {
      //   // some other error happened
      // }

      onError(e);
    } finally {
      setIsLoading((prev) => ({ ...prev, google: false }));
    }
  };

  const signInAnonymously = async () => {
    try {
      if (!__DEV__) {
        throw new Error("Anonymous sign-in is only available in development.");
      }

      setIsLoading((prev) => ({ ...prev, anonymous: true }));

      const { error } = await supabase.auth.signInAnonymously();

      // const { error } = await supabase.auth.signUp({
      //   email: "anonymous@test.com",
      //   password: "password"
      // });

      // const { error } = await supabase.auth.signInWithPassword({
      //   email: "anonymous@test.com",
      //   password: "password"
      // });

      if (error) throw error;
    } catch (err) {
      onError(err);
    } finally {
      setIsLoading((prev) => ({ ...prev, anonymous: false }));
    }
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      GoogleSignin.configure({
        scopes: ["https://www.googleapis.com/auth/drive.readonly"],
        webClientId
      });
    }
  }, []);

  return {
    isLoading,
    signInWithApple,
    signInWithGoogle,
    signInAnonymously
  };
}
