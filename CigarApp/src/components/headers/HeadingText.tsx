import { useAppColors } from "@/constants/app-colors";
import { StyleSheet, Text } from "react-native";

type HeadingTextProps = {
  text: string;
};

export default function HeadingText({ text }: HeadingTextProps) {
  const colors = useAppColors();

  return (
    <Text
      style={[
        styles.sectionTitle,
        styles.sectionGap,
        { color: colors.secondary },
      ]}
    >
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.4,
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionGap: {
    marginTop: 12,
  },
});
