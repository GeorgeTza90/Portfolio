import { useAppColors } from "@/constants/app-colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";

export interface CigaretteTypeCardProps {
  type: string;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CigaretteTypeCard({
  type,
  onEdit,
  onDelete,
}: CigaretteTypeCardProps) {
  const colors = useAppColors();

  return (
    <View
      key={type}
      style={[
        styles.typeCard,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View
        style={[styles.typeIcon, { backgroundColor: colors.accent + "20" }]}
      >
        <Ionicons name="flame-outline" size={22} color={colors.accent} />
      </View>

      <Text style={[styles.typeName, { color: colors.text }]} numberOfLines={2}>
        {type}
      </Text>

      <EditButton onPress={onEdit} type={type} />

      <DeleteButton onPress={onDelete} type={type} />
    </View>
  );
}

const styles = StyleSheet.create({
  typeCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
    gap: 10,
  },
  typeIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  typeName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
  },
  actionButton: {
    width: 34,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
