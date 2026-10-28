import { Alert } from "react-native";

type ConfirmActionOptions = {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
  onConfirm: () => void | Promise<void>;
  onError?: (error: unknown) => void;
};

export function showAlert(title: string, message: string) {
  Alert.alert(title, message);
}

export function showConfirmAlert({
  title,
  message,
  confirmText = "Επιβεβαίωση",
  cancelText = "Ακύρωση",
  destructive = false,
  onConfirm,
  onError,
}: ConfirmActionOptions) {
  Alert.alert(title, message, [
    {
      text: cancelText,
      style: "cancel",
    },
    {
      text: confirmText,
      style: destructive ? "destructive" : "default",
      onPress: async () => {
        try {
          await onConfirm();
        } catch (error) {
          if (onError) {
            onError(error);
          } else {
            showAlert("Σφάλμα", "Η ενέργεια δεν ολοκληρώθηκε.");
          }
        }
      },
    },
  ]);
}
