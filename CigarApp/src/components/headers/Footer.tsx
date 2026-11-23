import { useAppColors } from "@/constants/app-colors";
import { StyleSheet, Text } from "react-native";

type FooterProps = {
  text: string;
};

export default function Footer({ text }: FooterProps) {
  const colors = useAppColors();

  return (
    <Text style={[styles.footer, { color: colors.secondary }]}>{text}</Text>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 24,
    textAlign: "center",
    fontSize: 12,
  },
});
