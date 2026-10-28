import { useAppColors } from "@/constants/app-colors";
import { StyleSheet, Text, View } from "react-native";

export default function EmptyRecordsCard() {
  const colors = useAppColors();

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Text style={[styles.message, { color: colors.secondary }]}>
        Δεν υπάρχουν καταγραφές ακόμη.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 24,
  },
  message: {
    fontSize: 15,
    lineHeight: 22,
  },
});
