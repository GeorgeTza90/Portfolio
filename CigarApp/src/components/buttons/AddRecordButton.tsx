import { useAppColors } from "@/constants/app-colors";
import { Pressable, StyleSheet, Text } from "react-native";

export interface AddRecordButtonProps {
  onPress: () => void;
}

export default function AddRecordButton({ onPress }: AddRecordButtonProps) {
  const colors = useAppColors();

  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, { backgroundColor: colors.accent }]}
    >
      <Text style={styles.buttonText}>+ Καταγραφή τσιγάρου</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
