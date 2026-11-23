import { useAppColors } from "@/constants/app-colors";
import { ActivityIndicator, StyleSheet } from "react-native";

export default function LoaderCircle() {
  const colors = useAppColors();

  return (
    <ActivityIndicator
      size="large"
      color={colors.accent}
      style={styles.loader}
    />
  );
}

const styles = StyleSheet.create({
  loader: {
    marginTop: 50,
  },
});
