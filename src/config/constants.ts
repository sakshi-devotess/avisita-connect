import Constants from "expo-constants";
export const colors = {
  primary: "#2196f3",
  border: "#565656",
  red: "#d9534f",
  pink: "#EC407A",
  teal: "#26A69A",
  grey: "#d8d7d7ff",
  white: "#FFFFFF",
  darkGrey: "#6c757d",
  yellow: "#f0ad4e",
  black: "#000000",
};

export const config = {
  publicUrl: Constants.expoConfig?.extra?.publicUrl,
  graphQlUrl: Constants.expoConfig?.extra?.graphQlUrl,
  sentryDsn: Constants.expoConfig?.extra?.sentryDsn,
};
