import { useState } from "react";

import { Alert } from "react-native";
import { toast } from "sonner-native";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useAuthStore } from "~/store/auth-store";

export function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const { signOut } = useAuthStore();

  const handleSignOut = async () => {
    Alert.alert("Sign Out", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          try {
            setIsLoading(true);

            await signOut();
          } catch (_error) {
            toast.error(
              "An error occurred while signing out. Please try again."
            );
          } finally {
            setIsLoading(false);
          }
        }
      }
    ]);
  };

  return (
    <Button isLoading={isLoading} onPress={handleSignOut} variant="ghost">
      <Text className="text-destructive">Log out</Text>
    </Button>
  );
}
