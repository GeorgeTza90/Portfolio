import { useAppColors } from "@/constants/app-colors";
import { Pressable, StyleSheet, Text } from "react-native";

export interface CreateRecordTypeButtonProps {
  onPress: () => void;
}

export default function CreateRecordTypeButton({
  onPress,
}: CreateRecordTypeButtonProps) {
  const colors = useAppColors();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.createTypeButton,
        {
          borderColor: colors.accent,
          backgroundColor: colors.card,
        },
      ]}
    >
      <Text style={[styles.createTypeText, { color: colors.accent }]}>
        + Δημιούργησε τύπο τσιγάρου
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  createTypeButton: {
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  createTypeText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
