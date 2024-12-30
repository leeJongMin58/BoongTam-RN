import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SuttleScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>배송 조회 화면</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
