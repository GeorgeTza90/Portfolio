import { useState } from "react";
import { Alert } from "react-native";
import { addSmokingRecord } from "@/storage/smoking-records";
import { getCigaretteTypes } from "@/storage/cigarette-types";

type UseAddSmokingRecordOptions = {
  onSaved: () => Promise<void>;
  onClose: () => void;
};

export default function useAddSmokingRecord({
  onSaved,
  onClose,
}: UseAddSmokingRecordOptions) {
  const [selectedType, setSelectedType] = useState("");
  const [smokingTypes, setSmokingTypes] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [loadingTypes, setLoadingTypes] = useState(false);

  const loadTypes = async () => {
    setLoadingTypes(true);

    try {
      const savedTypes = await getCigaretteTypes();

      setSmokingTypes(savedTypes);

      setSelectedType((current) =>
        savedTypes.includes(current) ? current : (savedTypes[0] ?? ""),
      );
    } catch {
      Alert.alert("Σφάλμα", "Δεν ήταν δυνατή η φόρτωση των τύπων τσιγάρων.");
      setSmokingTypes([]);
      setSelectedType("");
    } finally {
      setLoadingTypes(false);
    }
  };

  const saveRecord = async () => {
    if (saving || loadingTypes) return;

    if (smokingTypes.length === 0) {
      Alert.alert(
        "Δεν υπάρχουν τύποι",
        "Πρόσθεσε πρώτα έναν τύπο από τις Ρυθμίσεις → Τύποι τσιγάρων.",
      );
      return;
    }

    if (!smokingTypes.includes(selectedType)) {
      Alert.alert(
        "Επιλογή τύπου",
        "Επίλεξε έναν έγκυρο τύπο τσιγάρου πριν από την αποθήκευση.",
      );
      return;
    }

    setSaving(true);

    try {
      await addSmokingRecord(selectedType);
      await onSaved();
      onClose();
    } catch {
      Alert.alert(
        "Σφάλμα αποθήκευσης",
        "Η καταγραφή δεν αποθηκεύτηκε. Δοκίμασε ξανά.",
      );
    } finally {
      setSaving(false);
    }
  };

  return {
    selectedType,
    setSelectedType,
    smokingTypes,
    saving,
    loadingTypes,
    loadTypes,
    saveRecord,
  };
}
