import { StyleSheet, Text, View } from "react-native";
import { useAppColors } from "@/constants/app-colors";
import { SmokingRecord } from "@/storage/smoking-records";
import { Period } from "@/utils/history-utils";
import { useEffect, useState } from "react";
import { useAverage } from "@/hooks/useAverage";

export interface TodayRecordsProps {
  todayRecords: SmokingRecord[];
  text: string;
  size: number;
  period: Period;
  includeAverage?: boolean;
}

export default function TodayRecords({
  todayRecords,
  text = "Καταγραφές σήμερα",
  size = 64,
  period = "week",
  includeAverage = false,
}: TodayRecordsProps) {
  const colors = useAppColors();
  const average = useAverage(period, todayRecords.length);

  return (
    <View
      style={{
        flexDirection: includeAverage ? "row" : "column",
        marginBottom: 15,
      }}
    >
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={{ color: colors.secondary, fontSize: size / 4 }}>
          {text}
        </Text>

        <Text style={[styles.count, { color: colors.text, fontSize: size }]}>
          {todayRecords.length}
        </Text>
      </View>

      {includeAverage && (
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={{ color: colors.secondary, fontSize: size / 4.6 }}>
            {"Μέσος Όρος (ανά μέρα)"}
          </Text>

          <Text style={[styles.count, { color: colors.text, fontSize: size }]}>
            {String(average)}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardDiv: {},
  card: {
    borderRadius: 18,
    padding: 15,
    margin: 5,
    alignItems: "center",
    minWidth: 186,
  },
  label: {
    fontSize: 15,
  },
  count: {
    fontWeight: "700",
    marginVertical: 8,
  },
  note: {
    fontSize: 13,
  },
});
