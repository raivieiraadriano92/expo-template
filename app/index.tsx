import { View } from "react-native";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { supabase } from "~/services/supabase";

export default function WelcomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Button
        onPress={() =>
          supabase.auth
            .signInAnonymously()
            .then(({ error }) => error && console.error(error))
            .catch(console.error)
        }
      >
        <Text>Login</Text>
      </Button>
    </View>
  );
}
