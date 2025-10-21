import { Stack } from "expo-router";

export default function LibraryLayout() {
  return (    
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CollectionDetail" options={{ headerShown: false }} />
    </Stack>
  );
}
