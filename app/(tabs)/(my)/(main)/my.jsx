import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import colors from "../../../../src/styles/color"; // Colors.ts를 참고합니다
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { STRINGS } from "../../../../src/config/string";
import { useTypography } from "../../../../src/utils/TypographyContext";
import typography from "../../../../src/styles/typhography";

export default function Profile() {
  const { typography } = useTypography();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* 상단 프로필 영역 */}
        <View style={styles.profileContainer}>
          {/* 기존 이미지 대신 MaterialIcons 아이콘으로 대체 */}
          <MaterialIcons name="account-circle" size={150} color={colors.gray300} style={styles.profileImage} />
          
          <Text style={styles.profileName}>{STRINGS.MY.info.nickname}</Text>
          <Link href="/my_page_edit" style={styles.editButton}>
            <Text style={styles.editButtonText}>✏️ {STRINGS.MY.info.info_edit}</Text>
          </Link>
        </View>

        {/* 보유 포인트 표시 */}
        <View style={styles.pointSection}>
          <Text style={styles.pointText}>🏆 {STRINGS.MY.info.point}: 1,000P</Text>
        </View>

        {/* 버튼 영역 */}
        <View style={styles.buttonContainer}>
          <Link href="/my_page_review" style={styles.button}>
            <Text style={styles.buttonText}>{STRINGS.MY.info.review_manage}</Text>
          </Link>
          <Link href="/my_page_suttle" style={styles.button}>
            <Text style={styles.buttonText}>{STRINGS.MY.info.suttle_check}</Text>
          </Link>
          <Link href="/my_page_bill" style={styles.button}>
            <Text style={styles.buttonText}>{STRINGS.MY.info.bill_paper}</Text>
          </Link>
        </View>

        {/* 하단 메뉴 영역 */}
        <View style={styles.menuContainer}>
          <Link href="/my_page_notice" style={styles.menuItem}>
            <View style={styles.menuIconWrapper}>
              <MaterialIcons name="campaign" style={styles.menuIcon} />
            </View>
            <View style={styles.menuItemContent}>
              {/* 객체의 name과 description을 정확히 렌더링 */}
              <Text style={styles.menuItemText}>{STRINGS.MY.info.policy.name}</Text>
              <Text style={styles.menuItemSubText}>{STRINGS.MY.info.policy.description}</Text>
            </View>
            <MaterialIcons name="chevron-right" style={styles.rightIcon} />
          </Link>

          <Link href="/my_page_service" style={styles.menuItem}>
            <View style={styles.menuIconWrapper}>
              <MaterialIcons name="help-outline" style={styles.menuIcon} />
            </View>
            <View style={styles.menuItemContent}>
              <Text style={styles.menuItemText}>{STRINGS.MY.info.service.name}</Text>
              <Text style={styles.menuItemSubText}>{STRINGS.MY.info.service.description}</Text>
            </View>
            <MaterialIcons name="chevron-right" style={styles.rightIcon} />
          </Link>

          <Link href="/my_page_police" style={styles.menuItem}>
            <View style={styles.menuIconWrapper}>
              <MaterialIcons name="description" style={styles.menuIcon} />
            </View>
            <View style={styles.menuItemContent}>
              <Text style={styles.menuItemText}>{STRINGS.MY.info.notice.name}</Text>
              <Text style={styles.menuItemSubText}>{STRINGS.MY.info.notice.description}</Text>
            </View>
            <MaterialIcons name="chevron-right" style={styles.rightIcon} />
          </Link>
        </View>

        {/* 하단 버전 표시 */}
        <Text style={styles.versionText}>{STRINGS.MY.info.version}</Text>
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
    backgroundColor: colors.gray200 || "#fff",
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    marginBottom: 10,
  },
  profileName: {
    ...typography.heading.large,
    fontSize: 20,
    fontWeight: "bold",
    color: colors.gray500 || "#333",
  },
  editButton: {
    backgroundColor: colors.orange100 || "#ffa500",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  editButtonText: {
    ...typography.label.large,
    color: colors.white,
    fontSize: 14,
  },
  pointSection: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: colors.gray300 || "#f7f7f7",
    padding: 10,
    borderRadius: 10,
  },
  pointText: {
    ...typography.body.medium,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white || "#333",
  },
  buttonContainer: {
    marginBottom: 30,
  },
  button: {
    backgroundColor: colors.orange200 || "#ffa500",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    padding: 20,
  },
  buttonText: {
    ...typography.label.large,
    textAlign: 'center',
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  menuContainer: {
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row', // 가로 배치
    alignItems: 'center', // 수직 정렬
    borderBottomWidth: 1,
    borderBottomColor: colors.gray500 || "#ddd",
    paddingVertical: 15,
  },
  menuIconWrapper: {
    borderRadius: 10, // 원형
    backgroundColor: colors.orange100, // 회색 배경
    width: 40, // 아이콘 배경 크기
    height: 40,
    alignItems: "center",
    justifyContent: "center", 
  },
  menuIcon: {
    fontSize: 24,
    color: colors.gray500,
  },
  menuItemContent: {
    flex: 1, // 텍스트가 남은 공간을 차지
    marginLeft: 16, // 아이콘과 텍스트 간격
  },
  menuItemText: {
    ...typography.body.medium,
    marginLeft: 10,
  },
  menuItemSubText: {
    ...typography.label.normal,
    marginLeft: 10,
  },
  rightIcon: {
    fontSize: 24,
    color: colors.gray500 || "#666",
  },
  versionText: {
    ...typography.label.small,
    textAlign: "center",
    color: colors.gray500 || "#666",
  },
});
