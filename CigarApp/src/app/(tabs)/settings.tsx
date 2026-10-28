import { Text, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import { useAppColors } from "@/constants/app-colors";
import ScreenLayout from "@/components/ScreenLayout";
import SettingItem from "@/components/items/SettingItem";
import AboutAppCard from "@/components/cards/AboutAppCard";
import useBackup from "@/hooks/useBackup";

export default function SettingsScreen() {
  const colors = useAppColors();

  const { backupLoading, handleExportBackup, handleRestoreBackup } =
    useBackup();

  return (
    <ScreenLayout title="Ρυθμίσεις">
      <Text style={[styles.sectionTitle, { color: colors.secondary }]}>
        ΠΡΟΣΩΠΟΠΟΙΗΣΗ
      </Text>

      <SettingItem
        icon="flame-outline"
        title="Τύποι τσιγάρων"
        description="Προσθήκη, μετονομασία και διαγραφή τύπων"
        onPress={() => router.push("/settings/cigarette-types")}
      />

      <Text
        style={[
          styles.sectionTitle,
          styles.sectionGap,
          { color: colors.secondary },
        ]}
      >
        ΔΕΔΟΜΕΝΑ
      </Text>

      <SettingItem
        icon="cloud-upload-outline"
        title="Δημιουργία αντιγράφου"
        description="Εξαγωγή καταγραφών και τύπων σε αρχείο JSON"
        onPress={handleExportBackup}
        loading={backupLoading}
      />

      <SettingItem
        icon="cloud-download-outline"
        title="Επαναφορά αντιγράφου"
        description="Εισαγωγή δεδομένων από υπάρχον αρχείο backup"
        onPress={handleRestoreBackup}
        loading={backupLoading}
      />

      <SettingItem
        icon="shield-checkmark-outline"
        title="Τοπική αποθήκευση"
        description="Οι καταγραφές σου αποθηκεύονται στη συσκευή"
        disabled={backupLoading}
        onPress={() =>
          Alert.alert(
            "Τοπική αποθήκευση",
            "Τα δεδομένα του CigarApp αποθηκεύονται τοπικά στη συσκευή σου. Για επιπλέον προστασία, δημιούργησε αντίγραφο ασφαλείας και φύλαξέ το σε ασφαλές σημείο.",
          )
        }
      />

      <Text
        style={[
          styles.sectionTitle,
          styles.sectionGap,
          { color: colors.secondary },
        ]}
      >
        ΕΦΑΡΜΟΓΗ
      </Text>

      <AboutAppCard />

      <Text style={[styles.footer, { color: colors.secondary }]}>
        Απλό. Προσωπικό. Οργανωμένο.
      </Text>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.4,
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionGap: {
    marginTop: 12,
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 28,
  },
});
