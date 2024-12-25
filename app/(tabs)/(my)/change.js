import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import colors from "../../../src/styles/color";

export default function EditProfile() {
  const [nickname, setNickname] = useState("");

  const handleCheckDuplicate = () => {
    // 닉네임 중복 체크 로직
    Alert.alert("중복 체크", "해당 닉네임은 사용 가능합니다.");
  };

  const handleChangeNickname = () => {
    if (nickname.length < 4 || nickname.length > 10) {
      Alert.alert("오류", "닉네임은 4~10글자로 설정해야 합니다.");
    } else {
      Alert.alert("성공", "닉네임이 변경되었습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이용안내</Text>
      <Text style={styles.description}>
        닉네임 작성 후 중복체크를 해주세요
      </Text>

      <Text style={styles.subtitle}>새로운 닉네임을 입력해 주세요</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="닉네임"
          value={nickname}
          onChangeText={(text) => setNickname(text)}
        />
        <TouchableOpacity style={styles.checkButton} onPress={handleCheckDuplicate}>
          <Text style={styles.checkButtonText}>중복 체크</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.hintText}>
        닉네임은 이모티콘 제외 4~10글자로 변경해주세요
      </Text>

      <TouchableOpacity style={styles.submitButton} onPress={handleChangeNickname}>
        <Text style={styles.submitButtonText}>변경하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white || "#fff",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: colors.gray500 || "#ffa500",
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: colors.gray500 || "#666",
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.gray500 || "#333",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.gray100 || "#ffa500",
    borderRadius: 10,
    padding: 5,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  checkButton: {
    backgroundColor: colors.gray500 || "#ffa500",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginLeft: 10,
  },
  checkButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  hintText: {
    fontSize: 12,
    color: colors.gray500 || "#666",
    marginBottom: 30,
  },
  submitButton: {
    backgroundColor: colors.gray500 || "#ffa500",
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
