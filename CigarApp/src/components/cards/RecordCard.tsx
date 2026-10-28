import { View, Text, StyleSheet } from "react-native";
import { useAppColors } from "@/constants/app-colors";
import DeleteButton from "@/components/buttons/DeleteButton";
import { formatDate, formatTime } from "@/utils/history-utils";
import type { SmokingRecord } from "@/storage/smoking-records";

type RecordCardProps = {
  record: SmokingRecord;
  onPress: (record: SmokingRecord) => void;
};

export default function RecordCard({ record, onPress }: RecordCardProps) {
  const colors = useAppColors();

  return (
    <View
      style={[
        styles.recordCard,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.recordInfo}>
        <Text style={[styles.recordType, { color: colors.text }]}>
          {record.type}
        </Text>

        <Text style={[styles.recordDate, { color: colors.secondary }]}>
          {formatDate(record.createdAt)} · {formatTime(record.createdAt)}
        </Text>
      </View>

      <DeleteButton type={record.type} onPress={() => onPress(record)} />
    </View>
  );
}

const styles = StyleSheet.create({
  recordCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  recordInfo: {
    flex: 1,
    gap: 6,
  },
  recordType: {
    fontSize: 16,
    fontWeight: "600",
  },
  recordDate: {
    fontSize: 13,
  },
});
