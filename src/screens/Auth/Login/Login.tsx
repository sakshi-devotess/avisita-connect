import { config } from "@/src/config/constants";
import { StyleSheet, Text, View } from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{config.publicUrl}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 16, fontWeight: "700", marginBottom: 12 },
  btn: {
    backgroundColor: "#111827",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  btnText: { color: "#fff", fontWeight: "600" },
});
