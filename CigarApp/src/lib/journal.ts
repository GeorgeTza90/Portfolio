import { File, Paths } from "expo-file-system";

export type CigaretteType = {
  id: string;
  name: string;
};

export type CigaretteEntry = {
  id: string;
  timestamp: string;
  typeId: string;
};

export type Journal = {
  version: 1;
  types: CigaretteType[];
  entries: CigaretteEntry[];
};

function getJournalFile() {
  return new File(Paths.document, "journal.json");
}

function getBackupFile() {
  return new File(Paths.document, "journal.backup.json");
}

const initialJournal: Journal = {
  version: 1,
  types: [
    { id: "rolled", name: "Στριφτό" },
    { id: "ready", name: "Έτοιμο" },
  ],
  entries: [],
};

function isJournal(value: unknown): value is Journal {
  if (!value || typeof value !== "object") return false;

  const data = value as Partial<Journal>;

  return (
    data.version === 1 &&
    Array.isArray(data.types) &&
    Array.isArray(data.entries) &&
    data.types.every(
      (item) =>
        item &&
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        item.name.trim().length > 0,
    ) &&
    data.entries.every(
      (item) =>
        item &&
        typeof item.id === "string" &&
        typeof item.timestamp === "string" &&
        !Number.isNaN(Date.parse(item.timestamp)) &&
        typeof item.typeId === "string",
    )
  );
}

async function readValidJournal(file: File): Promise<Journal | null> {
  try {
    if (!file.exists) return null;

    const text = await file.text();
    const parsed: unknown = JSON.parse(text);

    return isJournal(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

async function writeFile(file: File, contents: string) {
  if (!file.exists) {
    file.create({ intermediates: true });
  }

  await file.write(contents);
}

export async function loadJournal(): Promise<Journal> {
  const journalFile = getJournalFile();
  const backupFile = getBackupFile();
  const primary = await readValidJournal(journalFile);

  if (primary) {
    // Αν το κύριο αρχείο είναι έγκυρο, συγχρόνισε το backup.
    try {
      await writeFile(backupFile, JSON.stringify(primary, null, 2));
    } catch (error) {
      console.warn("Δεν ενημερώθηκε το backup:", error);
    }

    return primary;
  }

  // Αν το κύριο αρχείο λείπει ή είναι κατεστραμμένο,
  // προσπάθησε να ανακτήσεις τα δεδομένα από το backup.
  const backup = await readValidJournal(backupFile);

  if (backup) {
    await writeFile(journalFile, JSON.stringify(backup, null, 2));
    return backup;
  }

  // Αρχικοποίηση μόνο όταν δεν υπάρχει έγκυρο αντίγραφο.
  const fresh = initialJournal;
  await saveJournal(fresh);

  return fresh;
}

export async function saveJournal(data: Journal): Promise<void> {
  const journalFile = getJournalFile();
  const backupFile = getBackupFile();
  const contents = JSON.stringify(data, null, 2);

  // Κράτησε την τελευταία έγκυρη έκδοση πριν την αντικατάσταση.
  const current = await readValidJournal(journalFile);

  if (current) {
    await writeFile(backupFile, JSON.stringify(current, null, 2));
  }

  // Ενημέρωσε το κύριο αρχείο.
  await writeFile(journalFile, contents);

  // Κράτησε και το backup συγχρονισμένο με την τελευταία έκδοση.
  await writeFile(backupFile, contents);
}
