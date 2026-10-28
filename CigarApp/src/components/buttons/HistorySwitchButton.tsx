import { Pressable, Text, View, StyleSheet } from "react-native";
import { useAppColors } from "@/constants/app-colors";

type ViewMode = "list" | "stats";

type HistorySwitchButtonProps = {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
};

export default function HistorySwitchButton({
  viewMode,
  onChange,
}: HistorySwitchButtonProps) {
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
      <Pressable
        onPress={() => onChange("list")}
        style={[
          styles.option,
          viewMode === "list" && { backgroundColor: colors.accent },
        ]}
      >
        <Text
          style={{
            color: viewMode === "list" ? "#FFFFFF" : colors.text,
            fontWeight: "600",
          }}
        >
          Λίστα
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onChange("stats")}
        style={[
          styles.option,
          viewMode === "stats" && { backgroundColor: colors.accent },
        ]}
      >
        <Text
          style={{
            color: viewMode === "stats" ? "#FFFFFF" : colors.text,
            fontWeight: "600",
          }}
        >
          Στατιστικά
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 14,
    borderWidth: 1,
    padding: 4,
    marginBottom: 24,
  },
  option: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
  },
});
