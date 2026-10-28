import { Text, StyleSheet } from "react-native";
import { useAppColors } from "@/constants/app-colors";
import type { SmokingRecord } from "@/storage/smoking-records";
import EmptyRecordsCard from "@/components/empty-states/EmptyRecordsCard";
import RecordCard from "@/components/cards/RecordCard";

type RecordListProps = {
  records: SmokingRecord[];
  onDelete: (record: SmokingRecord) => void;
};

export default function RecordList({ records, onDelete }: RecordListProps) {
  const colors = useAppColors();

  return (
    <>
      <Text style={[styles.subtitle, { color: colors.secondary }]}>
        {records.length === 1
          ? "1 συνολική καταγραφή"
          : `${records.length} συνολικές καταγραφές`}
      </Text>

      {records.length === 0 ? (
        <EmptyRecordsCard />
      ) : (
        records.map((record) => (
          <RecordCard key={record.id} record={record} onPress={onDelete} />
        ))
      )}
    </>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
});
