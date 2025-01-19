import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import { Link, useRouter } from "expo-router";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors from "../../../src/styles/color";
import typography from "../../../src/styles/typhography";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserInfoUseCase, patchUserInfoUseCase } from "../../../src/usecases/mypageUsecase";

export default function UserInfoScreen() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    user_id: "",
    nickname: "",
    points:"",
    profile_picture: "",
    email: "",
    address1: "",
    ph: "",
  }); // 초기 상태값 설정
  const [loading, setLoading] = useState(true);
  const [editType, setEditType] = useState("");
  const [editValue, setEditValue] = useState("");

  // 유저 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfoUseCase();
        setUserInfo(data);
        console.log("Fetched User Info:", data);
      } catch (error) {
        console.error("Error fetching user info:", error);
        Alert.alert("Error", "유저 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  // 정보 수정 함수
  const handleEdit = async (type) => {
    if (!editValue) {
      Alert.alert("Error", "수정할 값을 입력하세요.");
      return;
    }
  
    try {
      const headers = { authorization: "NAMHEE1111" }; // 예시 토큰
      console.log("Sending request with type:", type, "value:", editValue); // 확인용 로그
      await patchUserInfoUseCase(headers, type, editValue);
      setUserInfo({ ...userInfo, [type]: editValue }); // 상태 갱신
      Alert.alert("Success", "정보가 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("Error updating user info:", error);
      Alert.alert("Error", "정보 수정에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <Text style={styles.loadingText}>유저 정보를 불러오는 중...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <Link href="(tabs)/(my)/my" style={styles.backbutton}>
          <MaterialIcons name="arrow-back" size={24} color={colors.gray500} />
        </Link>
        <Link href="(subs)/(my)/my_setting" style={styles.settingsButton}>
          <MaterialIcons name="settings" size={24} color={colors.gray500} />
        </Link>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {[
          { label: "닉네임", type: "nickname", value: userInfo.nickname },
          { label: "포인트", type: "points", value: userInfo.points },
          { label: "프로필 사진", type: "profile_picture", value: userInfo.profile_picture },
          { label: "이메일", type: "email", value: userInfo.email },
          { label: "주소", type: "address1", value: userInfo.address1 },
          { label: "전화번호", type: "ph", value: userInfo.ph },
        ].map((item, index) => (
          <View key={index} style={styles.infoItem}>
            <View style={styles.textContainer}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <TextInput
                style={styles.infoValue}
                defaultValue={item.value}
                editable={item.editable !== false}
                onChangeText={(text) => {
                  setEditType(item.type);
                  setEditValue(text);
                }}
              />
            </View>
            {item.editable !== false && (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEdit(item.type)}
              >
                <Text style={styles.editButtonText}>수정</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.gray100,
  },
  header: {
    height: 50,
    backgroundColor: colors.orange100,
    alignItems: "center",
    justifyContent: "center",
  },
  backbutton: {
    position: "absolute",
    left: 10,
  },
  settingsButton: {
    position: "absolute",
    right: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
  },
  infoLabel: {
    ...typography.label.large,
    color: colors.gray500,
  },
  infoValue: {
    ...typography.body.medium,
    color: colors.gray400,
  },
  editButton: {
    backgroundColor: colors.orange100,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  editButtonText: {
    ...typography.label.large,
    color: colors.white,
  },
});
