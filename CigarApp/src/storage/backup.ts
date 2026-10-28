import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";

const RECORDS_KEY = "@cigarapp/smoking-records";
const TYPES_KEY = "@cigarapp/cigarette-types";

const BACKUP_FORMAT = "cigarapp-backup";
const BACKUP_VERSION = 1;

type BackupRecord = {
  id: string;
  type: string;
  createdAt: string;
};

type BackupData = {
  format: typeof BACKUP_FORMAT;
  version: typeof BACKUP_VERSION;
  exportedAt: string;
  data: {
    records: BackupRecord[];
    cigaretteTypes: string[];
  };
};

function isValidRecord(value: unknown): value is BackupRecord {
  if (typeof value !== "object" || value === null) return false;

  const record = value as Record<string, unknown>;

  return (
    typeof record.id === "string" &&
    record.id.length > 0 &&
    typeof record.type === "string" &&
    typeof record.createdAt === "string" &&
    !Number.isNaN(Date.parse(record.createdAt))
  );
}

function validateBackup(value: unknown): BackupData {
  if (typeof value !== "object" || value === null) {
    throw new Error("Το αρχείο δεν περιέχει έγκυρα δεδομένα.");
  }

  const backup = value as Record<string, unknown>;

  if (backup.format !== BACKUP_FORMAT || backup.version !== BACKUP_VERSION) {
    throw new Error(
      "Το αρχείο δεν είναι συμβατό αντίγραφο ασφαλείας του CigarApp.",
    );
  }

  if (typeof backup.data !== "object" || backup.data === null) {
    throw new Error("Λείπουν τα δεδομένα του αντιγράφου ασφαλείας.");
  }

  const data = backup.data as Record<string, unknown>;

  if (!Array.isArray(data.records) || !data.records.every(isValidRecord)) {
    throw new Error("Οι καταγραφές του αρχείου δεν είναι έγκυρες.");
  }

  if (
    !Array.isArray(data.cigaretteTypes) ||
    !data.cigaretteTypes.every(
      (item) => typeof item === "string" && item.trim().length > 0,
    )
  ) {
    throw new Error("Οι τύποι τσιγάρων του αρχείου δεν είναι έγκυροι.");
  }

  const types = data.cigaretteTypes as string[];
  const normalizedTypes = types.map((type) =>
    type.trim().toLocaleLowerCase("el"),
  );

  if (new Set(normalizedTypes).size !== normalizedTypes.length) {
    throw new Error("Το αρχείο περιέχει διπλότυπους τύπους τσιγάρων.");
  }

  return {
    format: BACKUP_FORMAT,
    version: BACKUP_VERSION,
    exportedAt:
      typeof backup.exportedAt === "string" &&
      !Number.isNaN(Date.parse(backup.exportedAt))
        ? backup.exportedAt
        : new Date().toISOString(),
    data: {
      records: data.records as BackupRecord[],
      cigaretteTypes: types.map((type) => type.trim()),
    },
  };
}

export async function exportBackup(): Promise<void> {
  const storedData = await AsyncStorage.multiGet([RECORDS_KEY, TYPES_KEY]);

  const recordsJson = storedData[0]?.[1] ?? null;
  const typesJson = storedData[1]?.[1] ?? null;

  let records: unknown = [];
  let cigaretteTypes: unknown = [];

  if (recordsJson) records = JSON.parse(recordsJson);
  if (typesJson) cigaretteTypes = JSON.parse(typesJson);

  if (!Array.isArray(records) || !records.every(isValidRecord)) {
    throw new Error("Οι αποθηκευμένες καταγραφές δεν είναι έγκυρες.");
  }

  if (
    !Array.isArray(cigaretteTypes) ||
    !cigaretteTypes.every(
      (item) => typeof item === "string" && item.trim().length > 0,
    )
  ) {
    throw new Error("Οι αποθηκευμένοι τύποι τσιγάρων δεν είναι έγκυροι.");
  }

  const backup: BackupData = {
    format: BACKUP_FORMAT,
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    data: {
      records,
      cigaretteTypes,
    },
  };

  const json = JSON.stringify(backup, null, 2);

  const permission =
    await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

  if (!permission.granted) return;

  const fileName = `cigarapp-backup-${Date.now()}.json`;

  const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
    permission.directoryUri,
    fileName,
    "application/json",
  );

  await FileSystem.writeAsStringAsync(fileUri, json, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  Alert.alert(
    "Το backup αποθηκεύτηκε",
    `Το αρχείο ${fileName} αποθηκεύτηκε στον φάκελο που επέλεξες.`,
  );
}

export async function restoreBackup(): Promise<{
  recordsCount: number;
  typesCount: number;
} | null> {
  const result = await DocumentPicker.getDocumentAsync({
    type: "*/*",
    copyToCacheDirectory: true,
    multiple: false,
  });

  if (result.canceled || !result.assets?.length) {
    return null;
  }

  const file = result.assets[0];

  let contents: string;

  try {
    const response = await fetch(file.uri);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    contents = await response.text();
  } catch {
    throw new Error(
      "Δεν ήταν δυνατή η ανάγνωση του αρχείου. Δοκίμασε να επιλέξεις ξανά το backup από τον φάκελο όπου αποθηκεύτηκε.",
    );
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(contents);
  } catch {
    throw new Error("Το αρχείο δεν είναι έγκυρο JSON.");
  }

  const backup = validateBackup(parsed);

  await AsyncStorage.multiSet([
    [RECORDS_KEY, JSON.stringify(backup.data.records)],
    [TYPES_KEY, JSON.stringify(backup.data.cigaretteTypes)],
  ]);

  return {
    recordsCount: backup.data.records.length,
    typesCount: backup.data.cigaretteTypes.length,
  };
}
