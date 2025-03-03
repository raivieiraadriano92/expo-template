import { View } from "react-native";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { useColorScheme } from "~/lib/useColorScheme";
import { useAuthStore } from "~/store/auth-store";

export default function HomeScreen() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();

  const { signOut } = useAuthStore();

  function toggleColorScheme() {
    const newTheme = isDarkColorScheme ? "light" : "dark";

    setColorScheme(newTheme);

    setAndroidNavigationBar(newTheme);
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Button onPress={toggleColorScheme}>
        <Text>Toggle Theme</Text>
      </Button>
      <Button onPress={() => signOut()}>
        <Text>Logout</Text>
      </Button>
    </View>
  );
}
