import { useCallback, useState } from "react";
import { Alert, ActivityIndicator } from "react-native";
import { useFocusEffect } from "expo-router";
import { useAppColors } from "@/constants/app-colors";
import {
  getSmokingRecords,
  deleteSmokingRecord,
  type SmokingRecord,
} from "@/storage/smoking-records";
import ScreenLayout from "@/components/ScreenLayout";
import { type Period } from "@/utils/history-utils";
import HistorySwitchButton from "@/components/buttons/HistorySwitchButton";
import RecordList from "@/components/lists/RecordList";
import RecordChart from "@/components/charts/RecordChart";
import { showAlert, showConfirmAlert } from "@/hooks/alerts";

type ViewMode = "list" | "stats";

export default function HistoryScreen() {
  const colors = useAppColors();

  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [period, setPeriod] = useState<Period>("week");
  const [records, setRecords] = useState<SmokingRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRecords = useCallback(async () => {
    try {
      const savedRecords = await getSmokingRecords();
      setRecords(savedRecords);
    } catch {
      Alert.alert("Σφάλμα", "Δεν ήταν δυνατή η φόρτωση του ιστορικού.");
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      void loadRecords();
    }, [loadRecords]),
  );

  const handleDeleteRecord = (record: SmokingRecord) => {
    showConfirmAlert({
      title: "Διαγραφή καταγραφής",
      message: `Θέλεις να διαγράψεις την καταγραφή "${record.type}";`,
      confirmText: "Διαγραφή",
      destructive: true,
      onConfirm: async () => {
        await deleteSmokingRecord(record.id);
        await loadRecords();
      },
      onError: (error) => {
        console.error("Αποτυχία διαγραφής καταγραφής:", error);

        showAlert("Σφάλμα", "Δεν ήταν δυνατή η διαγραφή της καταγραφής.");
      },
    });
  };

  return (
    <ScreenLayout title="Ιστορικό">
      <HistorySwitchButton viewMode={viewMode} onChange={setViewMode} />

      {loading ? (
        <ActivityIndicator color={colors.accent} size="large" />
      ) : viewMode === "list" ? (
        <RecordList records={records} onDelete={handleDeleteRecord} />
      ) : (
        <RecordChart
          records={records}
          period={period}
          onPeriodChange={setPeriod}
        />
      )}
    </ScreenLayout>
  );
}
