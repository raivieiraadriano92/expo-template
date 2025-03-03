import { useMemo } from "react";

import { ActivityIndicator } from "react-native";

import { Button } from "./ui/button";
import { Text } from "./ui/text";

import { AppleIcon, GoogleIcon } from "~/lib/icons";

export type Provider = "apple" | "google" | "anonymous";

interface SignInButtonProps {
  provider: Provider;
  isLoading?: boolean;
  onPress: () => void;
}

export function SignInButton({
  provider,
  isLoading = false,
  onPress
}: SignInButtonProps) {
  const providerConfig = useMemo(() => {
    switch (provider) {
      case "apple":
        return {
          className: "bg-black dark:bg-white",
          textClassName: "text-white dark:text-black",
          icon: (
            <AppleIcon
              className="text-white dark:text-black"
              height={24}
              width={24}
            />
          ),
          label: "Sign in with Apple",
          variant: "default"
        };

      case "google":
        return {
          className: "bg-black dark:bg-white",
          textClassName: "text-white dark:text-black",
          icon: <GoogleIcon className="text-white" height={24} width={24} />,
          label: "Sign in with Google",
          variant: "default"
        };

      case "anonymous":
        return {
          label: "Sign in Anonymously",
          variant: "secondary"
        };
    }
  }, [provider]);

  return (
    <Button
      className={providerConfig.className}
      variant={providerConfig.variant}
      disabled={isLoading}
      onPress={onPress}
    >
      {providerConfig.icon}
      <Text className={providerConfig.textClassName}>
        {providerConfig.label}
      </Text>
      {isLoading && <ActivityIndicator />}
    </Button>
  );
}
