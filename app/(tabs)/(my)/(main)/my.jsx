import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import colors from "../../../../src/styles/color";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { STRINGS } from "../../../../src/config/string";
import typography from "../../../../src/styles/typhography";
import { getUserInfoUseCase, patchUserInfoUseCase } from "../../../../src/usecases/mypageUsecase";

export default function Profile() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfoUseCase();
        setUserInfo(data);
        console.log('main_my', data)
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  // 사용자 정보 수정 예시 함수
  const handleEdit = async () => {
    try {
      setLoading(true);
      const updatedData = await patchUserInfoUseCase(["nickname", "새 닉네임"]);
      setUserInfo(updatedData);
    } catch (error) {
      console.error("Error updating user info:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ActivityIndicator size="large" color={colors.orange200} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* 상단 네비게이션 */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => router.push("/(subs)/(my)/my_setting")}
        >
          <MaterialIcons name="settings" size={24} color={colors.gray500} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* 상단 프로필 영역 */}
          <View style={styles.profileContainer}>
            {userInfo?.profile_picture ? (
              <Image
                source={{ uri: userInfo.profile_picture }} // DB에서 가져온 이미지 URL 사용
                style={styles.profileImage}
              />
            ) : (
              <MaterialIcons
                name="account-circle"
                size={150}
                color={colors.gray300}
                style={styles.profileImage}
              />
            )}
            <Text style={styles.profileName}>
              {userInfo?.nickname || "Nickname"}
            </Text>
            <Link href="/(subs)/(my)/my_page_edit" asChild>
              <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                <MaterialIcons
                  name="edit"
                  size={20}
                  color={colors.gray200}
                  style={styles.editButtonIcon}
                />
                <Text style={styles.editButtonText}>
                  {STRINGS.MY.info.info_edit}
                </Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* 보유 포인트 표시 */}
          <View style={styles.pointSection}>
            <MaterialIcons
              name="emoji-events"
              size={20}
              color={colors.gray200}
              style={styles.pointIcon}
            />
            <Text style={styles.pointText}>
              {STRINGS.MY.info.point}: {userInfo?.points || "0"}P
            </Text>
          </View>

          {/* 버튼 영역 */}
          <View style={styles.buttonContainer}>
            <Link href="/(subs)/(my)/my_page_review" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                  {STRINGS.MY.info.review_manage}
                </Text>
              </TouchableOpacity>
            </Link>
            <Link href="/(subs)/(my)/my_page_bill" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                  {STRINGS.MY.info.bill_paper}
                </Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* 하단 메뉴 영역 */}
          <View style={styles.menuContainer}>
            {/* 메뉴 항목 */}
            <Link href="(subs)/(my)/my_page_notice" asChild>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuIconWrapper}>
                  <MaterialIcons name="campaign" style={styles.menuIcon} />
                </View>
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemText}>
                    {STRINGS.MY.info.policy.name}
                  </Text>
                  <Text style={styles.menuItemSubText}>
                    {STRINGS.MY.info.policy.description}
                  </Text>
                </View>
                <MaterialIcons
                  name="chevron-right"
                  style={styles.rightIcon}
                />
              </TouchableOpacity>
            </Link>

            <Link href="/(subs)/(my)/my_page_service" asChild>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuIconWrapper}>
                  <MaterialIcons name="help-outline" style={styles.menuIcon} />
                </View>
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemText}>
                    {STRINGS.MY.info.service.name}
                  </Text>
                  <Text style={styles.menuItemSubText}>
                    {STRINGS.MY.info.service.description}
                  </Text>
                </View>
                <MaterialIcons
                  name="chevron-right"
                  style={styles.rightIcon}
                />
              </TouchableOpacity>
            </Link>

            <Link href="/(subs)/(my)/my_page_police" asChild>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuIconWrapper}>
                  <MaterialIcons name="description" style={styles.menuIcon} />
                </View>
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemText}>
                    {STRINGS.MY.info.notice.name}
                  </Text>
                  <Text style={styles.menuItemSubText}>
                    {STRINGS.MY.info.notice.description}
                  </Text>
                </View>
                <MaterialIcons
                  name="chevron-right"
                  style={styles.rightIcon}
                />
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
    backgroundColor: colors.gray100,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    height: 50,
    backgroundColor: colors.gray100,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsButton: {
    position: "absolute",
    right: 10,
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
    textAlign: "center",
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  menuContainer: {
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
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
