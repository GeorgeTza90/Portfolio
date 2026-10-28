import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@cigarapp/cigarette-types";

export async function getCigaretteTypes(): Promise<string[]> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    if (
      Array.isArray(parsed) &&
      parsed.every((item) => typeof item === "string")
    ) {
      return parsed;
    }

    return [];
  } catch (error) {
    console.error("Σφάλμα ανάγνωσης τύπων:", error);
    throw error;
  }
}

export async function saveCigaretteTypes(types: string[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(types));
}

export async function addCigaretteType(name: string): Promise<string[]> {
  const normalized = name.trim();

  if (!normalized) {
    throw new Error("Ο τύπος δεν μπορεί να είναι κενός.");
  }

  const types = await getCigaretteTypes();

  if (
    types.some(
      (type) =>
        type.toLocaleLowerCase("el") === normalized.toLocaleLowerCase("el"),
    )
  ) {
    throw new Error("Αυτός ο τύπος υπάρχει ήδη.");
  }

  const updated = [...types, normalized];
  await saveCigaretteTypes(updated);

  return updated;
}

export async function renameCigaretteType(
  oldName: string,
  newName: string,
): Promise<string[]> {
  const normalized = newName.trim();

  if (!normalized) {
    throw new Error("Ο τύπος δεν μπορεί να είναι κενός.");
  }

  const types = await getCigaretteTypes();

  if (
    types.some(
      (type) =>
        type !== oldName &&
        type.toLocaleLowerCase("el") === normalized.toLocaleLowerCase("el"),
    )
  ) {
    throw new Error("Υπάρχει ήδη τύπος με αυτό το όνομα.");
  }

  const updated = types.map((type) => (type === oldName ? normalized : type));

  await saveCigaretteTypes(updated);
  return updated;
}

export async function deleteCigaretteType(name: string): Promise<string[]> {
  const types = await getCigaretteTypes();
  const updated = types.filter((type) => type !== name);

  await saveCigaretteTypes(updated);
  return updated;
}
