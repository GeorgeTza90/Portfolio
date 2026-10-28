import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useAppColors } from "@/constants/app-colors";

type SaveRecordButtonProps = {
  onPress: () => void;
  saving: boolean;
  disabled: boolean;
};

export default function SaveRecordButton({
  onPress,
  saving,
  disabled,
}: SaveRecordButtonProps) {
  const colors = useAppColors();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: colors.accent,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      {saving ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.buttonText}>Αποθήκευση καταγραφής</Text>
      )}
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
