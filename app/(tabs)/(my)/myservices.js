import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import colors from "../../../src/styles/color";

export default function CustomerServiceScreen() {
  const serviceOptions = [
    { title: "자주 묻는 질문", description: "궁금한 사항에 대해 적어주세요", icon: "💬" },
    { title: "전화 연결", description: "상담사와 연결하세요", icon: "📞" },
    { title: "이메일 문의", description: "이메일로 문의해 주세요", icon: "✉️" },
    { title: "고객안심센터 상담", description: "가입자의 정보 보호 불편, 불리한 처리, 대리…", icon: "🏠" },
    { title: "안전거래센터 신고", description: "법 또는 정책을 위반한 거래를 신고하세요.", icon: "🔒" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {serviceOptions.map((option, index) => (
        <View key={index} style={styles.optionContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>i</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>{option.title}</Text>
            <Text style={styles.optionDescription}>{option.description}</Text>
          </View>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>{option.icon}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray500 || "#ffa500",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  iconText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.gray500 || "#333",
  },
  optionDescription: {
    fontSize: 14,
    color: colors.gray500 || "#666",
    marginTop: 5,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray500 || "#ffa500",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 18,
    color: "#fff",
  },
});
