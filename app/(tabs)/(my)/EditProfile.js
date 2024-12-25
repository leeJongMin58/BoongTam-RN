import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import colors from "../../../src/styles/color";

export default function UserInfoScreen({ navigation }) {
  const userInfo = [
    { label: "이메일", value: "bung-aaa@bung.com", icon: "✉️" },
    { label: "주소", value: "서울특별시 봉어동", icon: "📍" },
    { label: "전화번호", value: "010-1111-1111", icon: "📞" },
    { label: "연결된 소셜 계정", value: "KAKAO", icon: "🔗" },
  ];

  const handleLogout = () => {
    Alert.alert("로그아웃", "로그아웃이 완료되었습니다.", [
      { text: "확인", onPress: () => console.log("Logout confirmed") },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.profileContainer}>
        <Image
          source={require("../../../assets/images/user.png")}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>아이디: 봉어킹</Text>
      </View>

      <View style={styles.infoContainer}>
        {userInfo.map((item, index) => (
          <View key={index} style={styles.infoItem}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>{item.icon}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate("my_page_change", item)}
            >
              <Text style={styles.editButtonText}>수정</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => navigation.navigate("my_page_withdrawal")}
        >
          <Text style={styles.deleteButtonText}>회원 탈퇴</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.gray500 || "#333",
  },
  infoContainer: {
    marginBottom: 30,
  },
  infoItem: {
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
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.gray500 || "#333",
  },
  infoValue: {
    fontSize: 14,
    color: colors.gray500 || "#666",
  },
  editButton: {
    backgroundColor: colors.gray500 || "#ffa500",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  editButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  bottomButtons: {
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: colors.gray500 || "#333",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: colors.gray500 || "#ffa500",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
  },
  deleteButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
