import { useCallback, useState } from "react";
import { Alert } from "react-native";
import {
  addCigaretteType,
  deleteCigaretteType,
  getCigaretteTypes,
  renameCigaretteType,
} from "@/storage/cigarette-types";

export default function useCigaretteTypes() {
  const [types, setTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadTypes = useCallback(async () => {
    try {
      const savedTypes = await getCigaretteTypes();
      setTypes(savedTypes);
    } catch {
      Alert.alert("Σφάλμα", "Δεν ήταν δυνατή η φόρτωση των τύπων.");
    } finally {
      setLoading(false);
    }
  }, []);

  const saveType = async (
    name: string,
    editingType: string | null,
  ): Promise<boolean> => {
    const normalized = name.trim();

    if (!normalized) {
      Alert.alert("Χρειάζεται όνομα", "Πληκτρολόγησε έναν τύπο τσιγάρων.");
      return false;
    }

    if (saving) return false;

    setSaving(true);

    try {
      const updated = editingType
        ? await renameCigaretteType(editingType, normalized)
        : await addCigaretteType(normalized);

      setTypes(updated);
      return true;
    } catch (error) {
      Alert.alert(
        "Δεν έγινε η αποθήκευση",
        error instanceof Error
          ? error.message
          : "Παρουσιάστηκε ένα απρόσμενο σφάλμα.",
      );
      return false;
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (type: string) => {
    Alert.alert("Διαγραφή τύπου", `Θέλεις να διαγράψεις τον τύπο «${type}»;`, [
      { text: "Ακύρωση", style: "cancel" },
      {
        text: "Διαγραφή",
        style: "destructive",
        onPress: async () => {
          try {
            const updated = await deleteCigaretteType(type);
            setTypes(updated);
          } catch {
            Alert.alert("Σφάλμα", "Δεν ήταν δυνατή η διαγραφή.");
          }
        },
      },
    ]);
  };

  return {
    types,
    loading,
    saving,
    loadTypes,
    saveType,
    confirmDelete,
  };
}
