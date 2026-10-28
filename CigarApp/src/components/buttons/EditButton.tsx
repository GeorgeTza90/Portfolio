import { useAppColors } from "@/constants/app-colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export interface EditButtonProps {
  onPress: () => void;
  type: string;
}

export default function EditButton({ onPress, type }: EditButtonProps) {
  const colors = useAppColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Μετονομασία ${type}`}
      hitSlop={8}
      onPress={onPress}
      style={styles.actionButton}
    >
      <Ionicons name="create-outline" size={21} color={colors.accent} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    width: 34,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
