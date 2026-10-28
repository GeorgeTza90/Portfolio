import { useAppColors } from "@/constants/app-colors";
import { Pressable, StyleSheet, Text } from "react-native";

type CancelButtonProps = {
  onPress: () => void;
  disabled: boolean;
};

export default function CancelButton({ onPress, disabled }: CancelButtonProps) {
  const colors = useAppColors();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={styles.cancelButton}
    >
      <Text style={[styles.cancelText, { color: colors.secondary }]}>
        Ακύρωση
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cancelButton: {
    paddingVertical: 14,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
