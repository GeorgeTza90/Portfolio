import type { ReactNode } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { useAppColors } from "@/constants/app-colors";

type ScreenLayoutProps = {
  title: string;
  children: ReactNode;
};

export default function ScreenLayout({ title, children }: ScreenLayoutProps) {
  const colors = useAppColors();

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.brand, { color: colors.accent }]}>CigarApp</Text>

      <Text style={[styles.heading, { color: colors.text }]}>{title}</Text>

      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 32,
  },
  brand: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  heading: {
    fontSize: 27,
    fontWeight: "700",
    marginTop: 30,
    marginBottom: 24,
  },
});
