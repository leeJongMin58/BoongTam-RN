import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ReviewScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>리뷰 관리 화면</Text>
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