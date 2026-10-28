import { View, Text, StyleSheet, Modal, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAppColors } from "@/constants/app-colors";
import useAddSmokingRecord from "@/hooks/useAddSmokingRecord";
import RecordTypeButton from "../buttons/RecordTypeButton";
import CreateRecordTypeButton from "../buttons/CreateRecordTypeButton";
import SaveRecordButton from "../buttons/SaveRecordButton";
import CancelButton from "../buttons/CancelButton";

type AddRecordModalProps = {
  visible: boolean;
  onClose: () => void;
  onSaved: () => Promise<void>;
};

export default function AddRecordModal({
  visible,
  onClose,
  onSaved,
}: AddRecordModalProps) {
  const colors = useAppColors();
  const router = useRouter();

  const {
    selectedType,
    setSelectedType,
    smokingTypes,
    saving,
    loadingTypes,
    loadTypes,
    saveRecord,
  } = useAddSmokingRecord({ onSaved, onClose });

  const handleOpen = () => {
    void loadTypes();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onShow={handleOpen}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[styles.modalCard, { backgroundColor: colors.background }]}
        >
          <Text style={[styles.modalTitle, { color: colors.text }]}>
            Νέα καταγραφή
          </Text>

          <Text style={[styles.modalSubtitle, { color: colors.secondary }]}>
            Επίλεξε τον τύπο που χρησιμοποίησες.
          </Text>

          {loadingTypes ? (
            <ActivityIndicator color={colors.accent} style={styles.loader} />
          ) : smokingTypes.length === 0 ? (
            <Text style={[styles.emptyTypes, { color: colors.secondary }]}>
              Δεν έχεις προσθέσει τύπους τσιγάρων. Πρόσθεσε έναν από τις
              Ρυθμίσεις → Τύποι τσιγάρων.
            </Text>
          ) : (
            <RecordTypeButton
              smokingTypes={smokingTypes}
              selectedType={selectedType}
              onSelect={setSelectedType}
            />
          )}

          {!loadingTypes && smokingTypes.length === 0 && (
            <CreateRecordTypeButton
              onPress={() => {
                onClose();
                router.push("/settings/cigarette-types");
              }}
            />
          )}

          <SaveRecordButton
            onPress={() => void saveRecord()}
            saving={saving}
            disabled={saving || loadingTypes || smokingTypes.length === 0}
          />

          <CancelButton onPress={onClose} disabled={saving} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  modalCard: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 36,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  modalSubtitle: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 20,
  },
  loader: {
    marginVertical: 24,
  },
  emptyTypes: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 8,
  },
});
