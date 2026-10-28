import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAppColors } from "@/constants/app-colors";

type CigaretteTypeModalProps = {
  visible: boolean;
  editingType: string | null;
  name: string;
  saving: boolean;
  onChangeName: (name: string) => void;
  onSave: () => void;
  onClose: () => void;
};

export default function CigaretteTypeModal({
  visible,
  editingType,
  name,
  saving,
  onChangeName,
  onSave,
  onClose,
}: CigaretteTypeModalProps) {
  const colors = useAppColors();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.modalTitle, { color: colors.text }]}>
            {editingType ? "Μετονομασία τύπου" : "Νέος τύπος"}
          </Text>

          <TextInput
            value={name}
            onChangeText={onChangeName}
            placeholder="π.χ. Κανονικό, Slim..."
            placeholderTextColor={colors.secondary}
            autoFocus
            maxLength={50}
            returnKeyType="done"
            onSubmitEditing={onSave}
            editable={!saving}
            selectionColor={colors.accent}
            style={[
              styles.input,
              {
                color: colors.text,
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}
          />

          <View style={styles.modalActions}>
            <Pressable
              disabled={saving}
              onPress={onClose}
              style={[styles.modalButton, { borderColor: colors.border }]}
            >
              <Text style={[styles.cancelText, { color: colors.text }]}>
                Ακύρωση
              </Text>
            </Pressable>

            <Pressable
              disabled={saving}
              onPress={onSave}
              style={[
                styles.modalButton,
                styles.saveButton,
                { backgroundColor: colors.accent },
              ]}
            >
              {saving ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.saveText}>Αποθήκευση</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 22,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 18,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 16,
  },
  modalActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    minHeight: 46,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  saveButton: {
    borderWidth: 0,
  },
  cancelText: {
    fontWeight: "600",
  },
  saveText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
