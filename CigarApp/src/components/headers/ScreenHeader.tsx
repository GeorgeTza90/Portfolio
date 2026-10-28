import { StyleSheet, Text, View } from "react-native";
import { useAppColors } from "@/constants/app-colors";

type ScreenHeaderProps = {
  title: string;
  subtitle: string;
};

export default function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
  const colors = useAppColors();

  return (
    <View style={styles.container}>
      <Text style={[styles.brand, { color: colors.accent }]}>CigarApp</Text>

      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

      <Text style={[styles.subtitle, { color: colors.secondary }]}>
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  brand: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 7,
  },
});
