import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export interface DeleteButtonProps {
  onPress: () => void;
  type: string;
}

export default function DeleteButton({ onPress, type }: DeleteButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Διαγραφή ${type}`}
      hitSlop={8}
      onPress={onPress}
      style={styles.actionButton}
    >
      <Ionicons name="trash-outline" size={20} color="#C65353" />
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
