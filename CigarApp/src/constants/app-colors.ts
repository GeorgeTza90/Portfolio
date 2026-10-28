import { useColorScheme } from "react-native";

const lightColors = {
  background: "#F5F3EF",
  text: "#29251F",
  secondary: "#777067",
  accent: "#80552D",
  card: "#FFFFFF",
  border: "#E3DED6",
};

const darkColors = {
  background: "#171717",
  text: "#F5F1EA",
  secondary: "#B8AEA1",
  accent: "#D6A56D",
  card: "#252321",
  border: "#3A3733",
};

export function useAppColors() {
  const scheme = useColorScheme();
  const dark = scheme === "dark";

  return {
    ...(dark ? darkColors : lightColors),
    dark,
  };
}
