import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "expo-router";
import {
  getSmokingRecords,
  type SmokingRecord,
} from "@/storage/smoking-records";
import ScreenLayout from "@/components/ScreenLayout";
import TodayRecords from "@/components/TodayRecords";
import AddRecordButton from "@/components/buttons/AddRecordButton";
import AddRecordModal from "@/components/modals/AddRecordModal";
import Footer from "@/components/headers/Footer";

export default function HomeScreen() {
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
        period="week"
      />

      <AddRecordButton onPress={() => setFormVisible(true)} />

      <Footer text="Το προσωπικό σου ημερολόγιο καπνίσματος" />

      <AddRecordModal
        visible={formVisible}
        onClose={() => setFormVisible(false)}
        onSaved={loadRecords}
      />
    </ScreenLayout>
  );
}
