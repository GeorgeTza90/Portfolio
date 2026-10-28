import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppColors } from "@/constants/app-colors";

type AboutAppCardProps = {
  appName?: string;
  description?: string;
  version?: string;
};

export default function AboutAppCard({
  appName = "CigarApp",
  description = "Προσωπικό ημερολόγιο καταγραφής",
  version = "1.0.0",
}: AboutAppCardProps) {
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
      <View style={[styles.logoBox, { backgroundColor: colors.accent + "20" }]}>
        <Ionicons name="leaf-outline" size={30} color={colors.accent} />
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{appName}</Text>

        <Text style={[styles.description, { color: colors.secondary }]}>
          {description}
        </Text>

        <Text style={[styles.version, { color: colors.secondary }]}>
          Έκδοση {version}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    borderWidth: StyleSheet.hairlineWidth,
  },
  logoBox: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },
  version: {
    fontSize: 12,
    marginTop: 7,
  },
});
