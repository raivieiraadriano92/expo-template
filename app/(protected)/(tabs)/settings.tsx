import Constants from "expo-constants";
import { ScrollView, View } from "react-native";

import { SignOutButton } from "~/components/sign-out-button";
import { Muted } from "~/components/ui/typography";

export default function SettingsScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="p-6"
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}
    >
      <View className="gap-8">
        <SignOutButton />
        <Muted className="text-center">
          Version {Constants.expoConfig?.version}
        </Muted>
      </View>
    </ScrollView>
  );
}
