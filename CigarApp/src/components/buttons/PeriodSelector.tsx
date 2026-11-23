import { View, Text, Pressable, StyleSheet } from "react-native";
import type { Period } from "@/utils/history-utils";
import { useAppColors } from "@/constants/app-colors";

type PeriodSelectorProps = {
  period: Period;
  onPeriodChange: (period: Period) => void;
};

const PERIOD_OPTIONS = [
  ["week", "Εβδομάδα"],
  ["month", "Μήνας"],
  ["year", "Έτος"],
] as const;

export default function PeriodSelector({
  period,
  onPeriodChange,
}: PeriodSelectorProps) {
  const colors = useAppColors();

  return (
    <View style={styles.periodSelector}>
      {PERIOD_OPTIONS.map(([key, label]) => (
        <Pressable
          key={key}
          onPress={() => onPeriodChange(key)}
          style={[
            styles.periodOption,
            {
              backgroundColor: period === key ? colors.accent : colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text
            style={{
              color: period === key ? "#FFFFFF" : colors.text,
              fontWeight: "600",
              fontSize: 13,
            }}
          >
            {label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  periodSelector: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  periodOption: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
});
