import { useAppColors } from "@/constants/app-colors";
import { Pressable, StyleSheet, Text } from "react-native";

export interface RecordTypeButtonProps {
  smokingTypes: string[];
  selectedType: string;
  onSelect: (type: string) => void;
}

export default function RecordTypeButton({
  smokingTypes,
  selectedType,
  onSelect,
}: RecordTypeButtonProps) {
  const colors = useAppColors();

  return smokingTypes.map((type) => {
    const selected = selectedType === type;

    return (
      <Pressable
        key={type}
        onPress={() => onSelect(type)}
        style={[
          styles.typeOption,
          {
            backgroundColor: colors.card,
            borderColor: selected ? colors.accent : colors.border,
            borderWidth: selected ? 2 : 1,
          },
        ]}
      >
        <Text style={[styles.typeText, { color: colors.text }]}>{type}</Text>

        <Text style={{ color: colors.accent, fontSize: 18 }}>
          {selected ? "●" : "○"}
        </Text>
      </Pressable>
    );
  });
}

const styles = StyleSheet.create({
  typeOption: {
    minHeight: 52,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  typeText: {
    fontSize: 14,
    flexShrink: 1,
    marginRight: 12,
  },
});
