import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import colors from "../../../src/styles/color";

export default function Profile({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* 상단 프로필 영역 */}
        <View style={styles.profileContainer}>
          <Image
            source={require("../../../assets/images/user.png")} // 로컬 이미지 경로
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>닉네임</Text>
          <Text style={styles.profileRole}>리뷰 관리</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("my_page_edit")}
          >
            <Text style={styles.editButtonText}>✏️ 내 정보 수정</Text>
          </TouchableOpacity>
        </View>

        {/* 보유 포인트 표시 */}
        <View style={styles.pointSection}>
          <Text style={styles.pointText}>🏆 보유 포인트: 1,000P</Text>
        </View>

        {/* 버튼 영역 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate("my_page_review")}
          >
            <Text style={styles.buttonText}>리뷰 관리</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate("my_page_suttle")}
          >
            <Text style={styles.buttonText}>배송 조회</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate("my_page_bill")}
          >
            <Text style={styles.buttonText}>결제 내역 보기</Text>
          </TouchableOpacity>
        </View>

        {/* 하단 메뉴 영역 */}
        <View style={styles.menuContainer}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate("my_page_notice")}  
          >
            <Text style={styles.menuItemText}>공지 사항</Text>
            <Text style={styles.menuItemSubText}>다양한 공지</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate("my_page_service")}    
          >
            <Text style={styles.menuItemText}>고객 센터</Text>
            <Text style={styles.menuItemSubText}>문제가 있을 시 문의주세요</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate("my_page_police")}  
          >
            <Text style={styles.menuItemText}>약관 및 정책</Text>
            <Text style={styles.menuItemSubText}>변경 사항에 대한 알림</Text>
          </TouchableOpacity>
        </View>

        {/* 하단 버전 표시 */}
        <Text style={styles.versionText}>현재 버전: 1.1.1</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.gray500 || "#fff",
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.gray500 || "#333",
  },
  profileRole: {
    fontSize: 16,
    color: colors.gray500 || "#666",
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: colors.gray500 || "#ffa500",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  pointSection: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: colors.gray500 || "#f7f7f7",
    padding: 10,
    borderRadius: 10,
  },
  pointText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.gray500 || "#333",
  },
  buttonContainer: {
    marginBottom: 30,
  },
  button: {
    backgroundColor: colors.gray500 || "#ffa500",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  menuContainer: {
    marginBottom: 30,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray500 || "#ddd",
    paddingVertical: 15,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.gray500 || "#333",
  },
  menuItemSubText: {
    fontSize: 14,
    color: colors.gray500 || "#666",
  },
  versionText: {
    textAlign: "center",
    color: colors.gray500 || "#666",
    fontSize: 12,
  },
});
