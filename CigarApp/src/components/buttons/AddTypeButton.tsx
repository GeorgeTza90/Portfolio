import { useAppColors } from "@/constants/app-colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export interface AddTypeButtonProps {
  onPress: () => void;
}

export default function AddTypeButton({ onPress }: AddTypeButtonProps) {
  const colors = useAppColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Προσθήκη τύπου"
      onPress={onPress}
      style={({ pressed }) => [
        styles.addButton,
        { backgroundColor: colors.accent, opacity: pressed ? 0.8 : 1 },
      ]}
    >
      <Ionicons name="add" size={25} color="#FFFFFF" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
});
