import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import colors from "../../../src/styles/color";

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    commentNotification: true,
    likeNotification: true,
    marketingNotification: true,
    cookingNotification: true,
    storeOpenNotification: false,
    useSafeNumber: true,
    autoUpdate: true,
    language: "한국어",
  });

  const toggleSwitch = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updateLanguage = (language) => {
    setSettings((prev) => ({ ...prev, language }));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* 알림 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>알림</Text>
          <View style={styles.row}>
            <Text style={styles.label}>댓글 알림</Text>
            <Switch
              value={settings.commentNotification}
              onValueChange={() => toggleSwitch("commentNotification")}
              trackColor={{ true: colors.orange100, false: "#ddd" }}
              thumbColor={settings.commentNotification ? "#fff" : "#fff"}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>좋아요 알림</Text>
            <Switch
              value={settings.likeNotification}
              onValueChange={() => toggleSwitch("likeNotification")}
              trackColor={{ true: colors.orange100, false: "#ddd" }}
              thumbColor={settings.likeNotification ? "#fff" : "#fff"}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>마케팅 푸시 알림</Text>
            <Switch
              value={settings.marketingNotification}
              onValueChange={() => toggleSwitch("marketingNotification")}
              trackColor={{ true: colors.orange100, false: "#ddd" }}
              thumbColor={settings.marketingNotification ? "#fff" : "#fff"}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>조리시간 알림</Text>
            <Switch
              value={settings.cookingNotification}
              onValueChange={() => toggleSwitch("cookingNotification")}
              trackColor={{ true: colors.orange100, false: "#ddd" }}
              thumbColor={settings.cookingNotification ? "#fff" : "#fff"}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>가게 오픈 알림</Text>
            <Switch
              value={settings.storeOpenNotification}
              onValueChange={() => toggleSwitch("storeOpenNotification")}
              trackColor={{ true: colors.orange100, false: "#ddd" }}
              thumbColor={settings.storeOpenNotification ? "#fff" : "#fff"}
            />
          </View>
        </View>

        {/* 기능 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>기능</Text>
          <View style={styles.row}>
            <Text style={styles.label}>안심번호 사용</Text>
            <Switch
              value={settings.useSafeNumber}
              onValueChange={() => toggleSwitch("useSafeNumber")}
              trackColor={{ true: colors.orange100, false: "#ddd" }}
              thumbColor={settings.useSafeNumber ? "#fff" : "#fff"}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>자동 업데이트</Text>
            <Switch
              value={settings.autoUpdate}
              onValueChange={() => toggleSwitch("autoUpdate")}
              trackColor={{ true: colors.orange100, false: "#ddd" }}
              thumbColor={settings.autoUpdate ? "#fff" : "#fff"}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>언어</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={settings.language}
                style={styles.picker}
                onValueChange={(itemValue) => updateLanguage(itemValue)}
              >
                <Picker.Item label="한국어" value="한국어" />
                <Picker.Item label="English" value="English" />
                <Picker.Item label="日本語" value="日本語" />
              </Picker>
            </View>
          </View>
        </View>

        {/* 저장 버튼 */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>저장</Text>
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
  container: {
    flex: 1,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.gray500 || "#333",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: colors.gray500 || "#666",
  },
  pickerContainer: {
    justifyContent: "center", // 텍스트 수직 정렬
    borderWidth: 1,
    borderColor: colors.gray500 || "#ffa500",
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden", // 텍스트가 잘리지 않도록 설정
    paddingHorizontal: 5, // 글자 크기에 따른 여백 추가
  },
  picker: {
    minWidth: 145, // 글자 길이에 따라 최소 너비 설정
    alignSelf: "flex-start", // 글자의 크기에 맞게 박스 크기 조정
    fontSize: 16,
    color: colors.gray500 || "#333",
    textAlignVertical: "center", // 텍스트가 가운데에 위치하도록 설정
  },
  saveButton: {
    backgroundColor: colors.gray500 || "#ffa500",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 30,
    marginBottom: 30,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
