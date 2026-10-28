import { StyleSheet, Text, View } from "react-native";
import { useAppColors } from "@/constants/app-colors";
import { SmokingRecord } from "@/storage/smoking-records";

export interface TodayRecordsProps {
  todayRecords: SmokingRecord[];
  text: string;
  size: number;
}

export default function TodayRecords({
  todayRecords,
  text = "Καταγραφές σήμερα",
  size = 64,
}: TodayRecordsProps) {
  const colors = useAppColors();

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Text style={{ color: colors.secondary, fontSize: size / 4 }}>
        {text}
      </Text>

      <Text style={[styles.count, { color: colors.text, fontSize: size }]}>
        {todayRecords.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 5,
    margin: 10,
    alignItems: "center",
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
