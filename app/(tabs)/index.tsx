import { View } from "react-native";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { useColorScheme } from "~/lib/useColorScheme";

export default function HomeScreen() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();

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
    </View>
  );
}
