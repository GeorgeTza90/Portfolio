import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import Svg from "react-native-svg";
import { useAppColors } from "@/constants/app-colors";
import type { SmokingRecord } from "@/storage/smoking-records";
import {
  type Period,
  getPeriodDays,
  filterRecordsByPeriod,
  getChartValues,
} from "@/utils/history-utils";
import TodayRecords from "../TodayRecords";
import PeriodSelector from "../buttons/PeriodSelector";
import ChartAxes from "./ChartAxes";
import ChartBars from "./ChartBars";

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

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    setSelectedDate(null);
  }, [period]);

  return (
    <>
      <PeriodSelector period={period} onPeriodChange={onPeriodChange} />

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
        period={period}
        includeAverage={true}
      />

      <View style={[styles.chartCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.chartTitle, { color: colors.text }]}>
          Καταγραφές ανά ημέρα
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Svg
            width={Math.max(chartWidth, chartLeft + chartValues.length * 12)}
            height={chartHeight}
            onPress={() => setSelectedDate(null)}
          >
            <ChartAxes
              chartLeft={chartLeft}
              chartTop={chartTop}
              chartBottom={chartBottom}
              chartWidth={chartWidth}
              chartAreaHeight={chartAreaHeight}
              maxCount={maxCount}
              borderColor={colors.border}
              textColor={colors.secondary}
            />

            <ChartBars
              chartValues={chartValues}
              chartLeft={chartLeft}
              chartTop={chartTop}
              chartBottom={chartBottom}
              chartAreaHeight={chartAreaHeight}
              step={step}
              barWidth={barWidth}
              maxCount={maxCount}
              period={period}
              barColor={colors.accent}
              textColor={colors.secondary}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
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
