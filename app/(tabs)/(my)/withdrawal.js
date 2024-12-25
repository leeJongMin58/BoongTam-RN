import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import colors from "../../../src/styles/color";

export default function WithdrawalScreen() {
  const [checked, setChecked] = useState(false);

  const handleWithdrawal = () => {
    if (!checked) {
      Alert.alert("주의", "유의사항에 동의해야 회원 탈퇴가 가능합니다.");
      return;
    }
    Alert.alert("회원 탈퇴", "회원 탈퇴가 완료되었습니다.");
  };

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 유의사항 섹션 */}
      <View style={styles.noticeSection}>
        <View style={styles.noticeHeader}>
          <Text style={styles.noticeTitle}>회원탈퇴 유의사항</Text>
          <View style={styles.noticeBadge}>
            <Text style={styles.noticeBadgeText}>주의!</Text>
          </View>
        </View>
        <Text style={styles.noticeDescription}>
          회원 탈퇴 전에 꼭 확인하세요
        </Text>
        <TouchableOpacity onPress={toggleChecked}>
          <View style={styles.checkContainer}>
            <Text style={styles.checkIcon}>
              {checked ? "✔️" : "◻️"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* 화살표 섹션 */}
      <View style={styles.arrowContainer}>
        <Text style={styles.arrowIcon}>⬇</Text>
      </View>

      {/* 하단 확인 문구 */}
      <View style={styles.confirmSection}>
        <Text style={styles.confirmText}>
          유의사항을 모두 확인하였으며, 회원 탈퇴 시 쿠폰, 포인트,
          상품권, 소멸에 동의합니다
        </Text>
      </View>

      {/* 탈퇴 버튼 */}
      <TouchableOpacity style={styles.withdrawalButton} onPress={handleWithdrawal}>
        <Text style={styles.withdrawalButtonText}>회원 탈퇴</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    alignItems: "center",
  },
  noticeSection: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  noticeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 50,
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.gray500 || "#333",
  },
  noticeBadge: {
    backgroundColor: colors.gray500 || "#ffa500",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  noticeBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  noticeDescription: {
    fontSize: 14,
    color: colors.gray500 || "#666",
    marginBottom: 15,
  },
  checkContainer: {
    alignItems: "flex-end",
  },
  checkIcon: {
    fontSize: 20,
    color: colors.gray500 || "#333",
  },
  arrowContainer: {
    marginBottom: 210,
  },
  arrowIcon: {
    fontSize: 30,
    color: colors.gray500 || "#333",
  },
  confirmSection: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  confirmText: {
    fontSize: 12,
    color: colors.gray500 || "#666",
    textAlign: "center",
  },
  withdrawalButton: {
    backgroundColor: colors.gray500 || "#ffa500",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 80,
    alignItems: "center",
  },
  withdrawalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
