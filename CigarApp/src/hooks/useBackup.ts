import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "expo-router";
import { exportBackup, restoreBackup } from "@/storage/backup";

export default function useBackup() {
  const [backupLoading, setBackupLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setBackupLoading(false);
    }, []),
  );

  const handleExportBackup = async () => {
    if (backupLoading) return;

    try {
      setBackupLoading(true);
      await exportBackup();
    } catch (error) {
      Alert.alert(
        "Αποτυχία δημιουργίας backup",
        error instanceof Error
          ? error.message
          : "Δεν ήταν δυνατή η δημιουργία του αντιγράφου ασφαλείας.",
      );
    } finally {
      setBackupLoading(false);
    }
  };

  const handleRestoreBackup = () => {
    if (backupLoading) return;

    Alert.alert(
      "Επαναφορά αντιγράφου ασφαλείας",
      "Τα υπάρχοντα δεδομένα σου θα αντικατασταθούν από τα δεδομένα του επιλεγμένου αρχείου. Θέλεις να συνεχίσεις;",
      [
        { text: "Ακύρωση", style: "cancel" },
        {
          text: "Συνέχεια",
          style: "destructive",
          onPress: async () => {
            try {
              setBackupLoading(true);

              const result = await restoreBackup();

              if (result === null) return;

              Alert.alert(
                "Η επαναφορά ολοκληρώθηκε",
                `Επαναφέρθηκαν ${result.recordsCount} καταγραφές και ${result.typesCount} τύποι τσιγάρων.`,
              );
            } catch (error) {
              console.error("Σφάλμα επαναφοράς:", error);

              Alert.alert(
                "Αποτυχία επαναφοράς",
                error instanceof Error
                  ? error.message
                  : "Δεν ήταν δυνατή η επαναφορά του αντιγράφου ασφαλείας.",
              );
            } finally {
              setBackupLoading(false);
            }
          },
        },
      ],
    );
  };

  return {
    backupLoading,
    handleExportBackup,
    handleRestoreBackup,
  };
}
