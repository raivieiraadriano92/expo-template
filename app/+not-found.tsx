import { Link } from "expo-router";
import { View } from "react-native";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { P } from "~/components/ui/typography";

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-6">
      <P>This screen doesn't exist.</P>
      <Link asChild href="/" replace>
        <Button>
          <Text>Go to home screen!</Text>
        </Button>
      </Link>
    </View>
  );
}
