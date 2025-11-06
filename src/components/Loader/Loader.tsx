import { colors } from "@/src/config/constants";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { ILoaderProps } from "./Loader.model";

const Loader: React.FC<ILoaderProps> = ({
  loading,
  children,
  size = "large",
  color = colors.primary,
  isShowLoaderText = false,
}) => {
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={size} color={color} />
        {isShowLoaderText && (
          <Text style={styles.loaderText}>Please wait...</Text>
        )}
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 12,
    fontSize: 16,
    color: "#555",
  },
});

export default Loader;
