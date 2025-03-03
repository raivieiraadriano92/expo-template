import { View } from "react-native";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useAuthStore } from "~/store/auth-store";

export default function WelcomeScreen() {
  const { setSession } = useAuthStore();

  return (
    <View className="flex-1 items-center justify-center">
      <Button onPress={() => setSession({ user: { id: 1 } })}>
        <Text>Login</Text>
      </Button>
    </View>
  );
}
