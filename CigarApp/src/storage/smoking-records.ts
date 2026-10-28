import AsyncStorage from "@react-native-async-storage/async-storage";

export type SmokingRecord = {
  id: string;
  type: string;
  createdAt: string;
};

const STORAGE_KEY = "@cigarapp/smoking-records";

export async function getSmokingRecords(): Promise<SmokingRecord[]> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is SmokingRecord =>
        typeof item?.id === "string" &&
        typeof item?.type === "string" &&
        typeof item?.createdAt === "string",
    );
  } catch (error) {
    console.error("Αποτυχία ανάγνωσης καταγραφών:", error);
    throw error;
  }
}

export async function addSmokingRecord(type: string): Promise<SmokingRecord> {
  const records = await getSmokingRecords();

  const record: SmokingRecord = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    type,
    createdAt: new Date().toISOString(),
  };

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...records]));

  return record;
}

export async function deleteSmokingRecord(id: string): Promise<void> {
  const records = await getSmokingRecords();
  const updatedRecords = records.filter((record) => record.id !== id);

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
}
