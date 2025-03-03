import { Stack } from "expo-router";

function ProtectedLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ title: "Main" }} />
    </Stack>
  );
}

export default ProtectedLayout;
