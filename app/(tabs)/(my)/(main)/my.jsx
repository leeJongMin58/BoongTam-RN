import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Link } from "expo-router";
import colors from "../../../../src/styles/color";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { STRINGS } from "../../../../src/config/string";
import typography from "../../../../src/styles/typhography";

export default function Profile() {

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* 상단 프로필 영역 */}
          <View style={styles.profileContainer}>

            <MaterialIcons name="account-circle" size={150} color={colors.gray300} style={styles.profileImage} />

            <Text style={styles.profileName}>{STRINGS.MY.info.nickname}</Text>
            <Link href="/(subs)/(my)/my_page_edit" asChild>
              <TouchableOpacity style={styles.editButton}>
                <MaterialIcons name="edit" size={20} color={colors.gray200} style={styles.editButtonIcon} />
                <Text style={styles.editButtonText}>{STRINGS.MY.info.info_edit}</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* 보유 포인트 표시 */}
          <View style={styles.pointSection}>
            <MaterialIcons name="emoji-events" size={20} color={colors.gray200} style={styles.pointIcon} />
            <Text style={styles.pointText}>{STRINGS.MY.info.point}: 1,000P</Text>
          </View>

          {/* 버튼 영역 */}
          <View style={styles.buttonContainer}>
            <Link href="/(subs)/(my)/my_page_review" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>{STRINGS.MY.info.review_manage}</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/(subs)/(my)/my_page_suttle" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>{STRINGS.MY.info.suttle_check}</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/(subs)/(my)/my_page_bill" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>{STRINGS.MY.info.bill_paper}</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* 하단 메뉴 영역 */}
          <View style={styles.menuContainer}>
            <Link href="/(subs)/(my)/my_page_notice" asChild>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuIconWrapper}>
                  <MaterialIcons name="campaign" style={styles.menuIcon} />
                </View>
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemText}>{STRINGS.MY.info.policy.name}</Text>
                  <Text style={styles.menuItemSubText}>{STRINGS.MY.info.policy.description}</Text>
                </View>
                <MaterialIcons name="chevron-right" style={styles.rightIcon} />
              </TouchableOpacity>
            </Link>

            <Link href="/(subs)/(my)/my_page_service" asChild>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuIconWrapper}>
                  <MaterialIcons name="help-outline" style={styles.menuIcon} />
                </View>
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemText}>{STRINGS.MY.info.service.name}</Text>
                  <Text style={styles.menuItemSubText}>{STRINGS.MY.info.service.description}</Text>
                </View>
                <MaterialIcons name="chevron-right" style={styles.rightIcon} />
              </TouchableOpacity>
            </Link>

            <Link href="/(subs)/(my)/my_page_police" asChild>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuIconWrapper}>
                  <MaterialIcons name="description" style={styles.menuIcon} />
                </View>
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemText}>{STRINGS.MY.info.notice.name}</Text>
                  <Text style={styles.menuItemSubText}>{STRINGS.MY.info.notice.description}</Text>
                </View>
                <MaterialIcons name="chevron-right" style={styles.rightIcon} />
              </TouchableOpacity>
            </Link>
          </View>

          {/* 하단 버전 표시 */}
          <Text style={styles.versionText}>{STRINGS.MY.info.version}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.gray200,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
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
    color: colors.gray500,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.orange100,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  editButtonText: {
    ...typography.label.large,
    color: colors.white,
    fontSize: 14,
    marginLeft: 5,
  },
  pointSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: colors.gray300,
    padding: 10,
    borderRadius: 10,
  },
  pointText: {
    ...typography.body.medium,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  },
  buttonContainer: {
    marginBottom: 30,
  },
  button: {
    backgroundColor: colors.orange200,
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
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray500,
    paddingVertical: 15,
  },
  menuIconWrapper: {
    borderRadius: 10,
    backgroundColor: colors.orange100,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  menuIcon: {
    fontSize: 24,
    color: colors.gray500,
  },
  menuItemContent: {
    flex: 1,
    marginLeft: 16,
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
    color: colors.gray500,
  },
  versionText: {
    ...typography.label.small,
    textAlign: "center",
    color: colors.gray500,
  },
});
