import { Tabs } from "expo-router";
import { useAppColors } from "@/constants/app-colors";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  const colors = useAppColors();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.secondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Αρχική",
          tabBarLabel: "Αρχική",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={typeof color === "string" ? color : colors.secondary}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "Ιστορικό",
          tabBarLabel: "Ιστορικό",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={size}
              color={typeof color === "string" ? color : colors.secondary}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Ρυθμίσεις",
          tabBarLabel: "Ρυθμίσεις",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={typeof color === "string" ? color : colors.secondary}
            />
          ),
        }}
      />
    </Tabs>
  );
}
