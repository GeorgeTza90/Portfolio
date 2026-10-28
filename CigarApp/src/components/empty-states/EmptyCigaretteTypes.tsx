import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppColors } from "@/constants/app-colors";

type EmptyCigaretteTypesProps = {
  onAddPress: () => void;
};

export default function EmptyCigaretteTypes({
  onAddPress,
}: EmptyCigaretteTypesProps) {
  const colors = useAppColors();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <Ionicons name="albums-outline" size={42} color={colors.accent} />

      <Text style={[styles.title, { color: colors.text }]}>
        Δεν έχεις προσθέσει τύπους
      </Text>

      <Text style={[styles.description, { color: colors.secondary }]}>
        Πάτησε το + για να δημιουργήσεις τον πρώτο σου τύπο.
      </Text>

      <Pressable
        accessibilityRole="button"
        onPress={onAddPress}
        style={[styles.button, { backgroundColor: colors.accent }]}
      >
        <Text style={styles.buttonText}>Προσθήκη τύπου</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 18,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 8,
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
