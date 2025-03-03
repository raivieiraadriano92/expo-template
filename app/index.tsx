import { Image, Platform, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { toast } from "sonner-native";

import { SignInButton } from "~/components/sign-in-button";
import { H1, P } from "~/components/ui/typography";
import { useSignIn } from "~/hooks/use-sign-in";

export default function WelcomeScreen() {
  const { isLoading, signInWithApple, signInWithGoogle, signInAnonymously } =
    useSignIn({
      onError: () => toast.error("An error occurred. Please try again later.")
    });

  const handleSignIn = async (provider: "apple" | "google" | "anonymous") => {
    switch (provider) {
      case "apple":
        await signInWithApple();

        break;

      case "google":
        await signInWithGoogle();

        break;

      case "anonymous":
        await signInAnonymously();

        break;
    }
  };

  return (
    <View className="p-safe m-6 flex-1 gap-10">
      {/* Logo Section */}
      <Animated.View
        className="flex-1 items-center justify-center"
        entering={FadeInUp}
      >
        <Image
          source={require("assets/images/icon.png")}
          className="h-24 w-24"
        />
      </Animated.View>

      {/* Title Section */}
      <View className="items-center gap-3">
        <Animated.View entering={FadeInUp.delay(50)}>
          <H1 className="text-center">Start Your Fasting Journey Today!</H1>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(100)}>
          <P className="text-center">
            Welcome to Fastify, your all-in-one solution for intermittent
            fasting success. Let's get started on journey to better health and
            well-being!
          </P>
        </Animated.View>
      </View>

      {/* Auth Buttons Section */}
      <View className="gap-3">
        {Platform.OS === "ios" && (
          <Animated.View entering={FadeInUp.delay(150)}>
            <SignInButton
              provider="apple"
              onPress={() => handleSignIn("apple")}
              isLoading={isLoading.apple}
            />
          </Animated.View>
        )}
        {Platform.OS === "android" && (
          <Animated.View entering={FadeInUp.delay(150)}>
            <SignInButton
              provider="google"
              onPress={() => handleSignIn("google")}
              isLoading={isLoading.google}
            />
          </Animated.View>
        )}
        {__DEV__ && (
          <Animated.View entering={FadeInUp.delay(200)}>
            <SignInButton
              provider="anonymous"
              onPress={() => handleSignIn("anonymous")}
              isLoading={isLoading.anonymous}
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
}
