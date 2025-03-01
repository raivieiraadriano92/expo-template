import React from "react";

import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ animation: "shift" }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}
