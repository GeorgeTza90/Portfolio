import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import Svg, { Line, Rect, Text as SvgText } from "react-native-svg";
import { useAppColors } from "@/constants/app-colors";
import type { SmokingRecord } from "@/storage/smoking-records";
import {
  type Period,
  getPeriodLabel,
  getPeriodDays,
  filterRecordsByPeriod,
  getChartValues,
} from "@/utils/history-utils";
import TodayRecords from "../TodayRecords";

type RecordChartProps = {
  records: SmokingRecord[];
  period: Period;
  onPeriodChange: (period: Period) => void;
};

export default function RecordChart({
  records,
  period,
  onPeriodChange,
}: RecordChartProps) {
  const colors = useAppColors();

  const days = getPeriodDays(period);
  const periodRecords = filterRecordsByPeriod(records, period);
  const chartValues = getChartValues(days, periodRecords);
  const periodLabel = getPeriodLabel(period);

  const chartWidth = 320;
  const chartHeight = 220;
  const chartLeft = 28;
  const chartTop = 18;
  const chartBottom = 174;
  const chartAreaHeight = chartBottom - chartTop;
  const chartAreaWidth = chartWidth - chartLeft - 10;
  const maxCount = Math.max(1, ...chartValues.map((item) => item.count));
  const step = chartAreaWidth / Math.max(1, chartValues.length);
  const barWidth = Math.max(2, Math.min(22, step * 0.58));

  return (
    <>
      <View style={styles.periodSelector}>
        {(
          [
            ["week", "Εβδομάδα"],
            ["month", "Μήνας"],
            ["year", "Έτος"],
          ] as const
        ).map(([key, label]) => (
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

      <TodayRecords
        todayRecords={periodRecords}
        text={
          period === "week"
            ? "τις τελευταίες 7 ημέρες"
            : period === "month"
              ? "αυτόν τον μήνα"
              : "αυτό το έτος"
        }
        size={50}
      />

      <View style={[styles.chartCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.chartTitle, { color: colors.text }]}>
          Καταγραφές ανά ημέρα
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Svg
            width={Math.max(chartWidth, chartLeft + chartValues.length * 12)}
            height={chartHeight}
          >
            {[0, 1, 2, 3].map((index) => {
              const y = chartTop + (chartAreaHeight / 3) * index;
              const value = Math.ceil(maxCount * (1 - index / 3));

              return (
                <View key={index}>
                  <Line
                    x1={chartLeft}
                    y1={y}
                    x2={chartWidth - 8}
                    y2={y}
                    stroke={colors.border}
                    strokeWidth={1}
                  />

                  <SvgText
                    x={chartLeft - 8}
                    y={y + 4}
                    fill={colors.secondary}
                    fontSize={10}
                    textAnchor="end"
                  >
                    {value}
                  </SvgText>
                </View>
              );
            })}

            {chartValues.map((item, index) => {
              const barHeight = (item.count / maxCount) * chartAreaHeight;
              const x = chartLeft + index * step + (step - barWidth) / 2;
              const y = chartBottom - barHeight;

              const showLabel =
                period === "week" ||
                index % (period === "month" ? 5 : 30) === 0 ||
                index === chartValues.length - 1;

              return (
                <View key={item.date.toISOString()}>
                  <Rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={Math.max(1, barHeight)}
                    rx={3}
                    fill={colors.accent}
                  />

                  {showLabel && (
                    <SvgText
                      x={x + barWidth / 2}
                      y={chartBottom + 18}
                      fill={colors.secondary}
                      fontSize={10}
                      textAnchor="middle"
                    >
                      {`${item.date.getDate()}/${item.date.getMonth() + 1}`}
                    </SvgText>
                  )}
                </View>
              );
            })}
          </Svg>
        </ScrollView>

        {periodRecords.length === 0 && (
          <Text style={[styles.emptyChart, { color: colors.secondary }]}>
            Δεν υπάρχουν καταγραφές σε αυτή την περίοδο.
          </Text>
        )}
      </View>
    </>
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
  periodLabel: {
    fontSize: 13,
    marginBottom: 12,
  },
  summaryCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
    gap: 8,
  },
  summaryLabel: {
    fontSize: 13,
  },
  summaryCount: {
    fontSize: 32,
    fontWeight: "700",
  },
  chartCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  emptyChart: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 12,
  },
});
