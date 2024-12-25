import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import colors from "../../../src/styles/color";

export default function TermsPolicyScreen() {
  const policies = [
    { title: "사업자 정보 확인", date: "2024-11-29" },
    { title: "이용약관", date: "2024-11-29" },
    { title: "전자금융거래 이용약관", date: "2024-11-29" },
    { title: "개인정보 처리방침", date: "2024-11-29" },
    { title: "리뷰 운영 정책", date: "2024-11-29" },
    { title: "데이터 제공 정책", date: "2024-11-29" },
    { title: "소비자 분쟁 해결 기준", date: "2024-11-29" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {policies.map((policy, index) => (
        <TouchableOpacity key={index} style={styles.policyItem}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>📄</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.policyTitle}>{policy.title}</Text>
            <Text style={styles.policyDate}>{policy.date}</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Text style={styles.arrowText}>➔</Text>
          </View>
        </TouchableOpacity>
      ))}
      {/* 새로고침 버튼 */}
      <TouchableOpacity style={styles.refreshButton}>
        <Text style={styles.refreshButtonText}>⟳</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: "#f5f5f5",
    },
    policyItem: {
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
      fontSize: 20,
      color: "#fff",
    },
    textContainer: {
      flex: 1,
    },
    policyTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.gray500 || "#333",
    },
    policyDate: {
      fontSize: 14,
      color: colors.gray500 || "#666",
      marginTop: 5,
    },
    arrowContainer: {
      width: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    arrowText: {
      fontSize: 20,
      color: colors.gray500 || "#333",
    },
    refreshButton: {
      alignSelf: "center",
      marginTop: 1,
    },
    refreshButtonText: {
      fontSize: 48, // 두 배 크기로 설정
      color: colors.gray500 || "#333", // 텍스트 색상만 표시
    },
  });
  