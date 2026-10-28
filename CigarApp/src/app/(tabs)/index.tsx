import { useCallback, useState } from "react";
import { Text, StyleSheet, Alert } from "react-native";
import { useFocusEffect } from "expo-router";
import { useAppColors } from "@/constants/app-colors";
import {
  getSmokingRecords,
  type SmokingRecord,
} from "@/storage/smoking-records";
import ScreenLayout from "@/components/ScreenLayout";
import TodayRecords from "@/components/TodayRecords";
import AddRecordButton from "@/components/buttons/AddRecordButton";
import AddRecordModal from "@/components/modals/AddRecordModal";

export default function HomeScreen() {
  const colors = useAppColors();

  const [formVisible, setFormVisible] = useState(false);
  const [records, setRecords] = useState<SmokingRecord[]>([]);

  const loadRecords = useCallback(async () => {
    try {
      const savedRecords = await getSmokingRecords();
      setRecords(savedRecords);
    } catch {
      Alert.alert("Σφάλμα", "Δεν ήταν δυνατή η φόρτωση των καταγραφών.");
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadRecords();
    }, [loadRecords]),
  );

  const today = new Date().toDateString();

  const todayRecords = records.filter(
    (record) => new Date(record.createdAt).toDateString() === today,
  );

  return (
    <ScreenLayout title="Η σημερινή σου εικόνα">
      <TodayRecords
        todayRecords={todayRecords}
        text={"Καταγραφές σήμερα"}
        size={64}
      />

      <AddRecordButton onPress={() => setFormVisible(true)} />

      <Text style={[styles.footer, { color: colors.secondary }]}>
        Το προσωπικό σου ημερολόγιο καπνίσματος
      </Text>

      <AddRecordModal
        visible={formVisible}
        onClose={() => setFormVisible(false)}
        onSaved={loadRecords}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 24,
    textAlign: "center",
    fontSize: 12,
  },
});
