import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppColors } from "@/constants/app-colors";

type SettingItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export default function SettingItem({
  icon,
  title,
  description,
  onPress,
  loading = false,
  disabled = false,
}: SettingItemProps) {
  const colors = useAppColors();

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.item,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: pressed ? 0.75 : disabled || loading ? 0.6 : 1,
        },
      ]}
    >
      <View style={[styles.iconBox, { backgroundColor: colors.accent + "20" }]}>
        <Ionicons name={icon} size={22} color={colors.accent} />
      </View>

      <View style={styles.itemContent}>
        <Text style={[styles.itemTitle, { color: colors.text }]}>{title}</Text>

        <Text style={[styles.description, { color: colors.secondary }]}>
          {description}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator color={colors.accent} />
      ) : (
        <Ionicons name="chevron-forward" size={19} color={colors.secondary} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 18,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    borderWidth: StyleSheet.hairlineWidth,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },
});
