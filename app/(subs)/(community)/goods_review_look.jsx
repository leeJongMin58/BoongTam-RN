import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../src/styles/color";
import typography from "../../../src/styles/typhography";

const GoodsReviewLook = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  let review;

  // JSON 데이터 파싱
  try {
    review = JSON.parse(params.review); // 전달받은 리뷰 데이터를 파싱
  } catch (error) {
    console.error("리뷰 데이터 파싱 중 오류:", error);
    review = null;
  }

  const isGoodsReview = review?.goods_id !== undefined;
  if (!review || !isGoodsReview) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>굿즈 리뷰 데이터를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  const {
    user_simple_info: { nickname = "익명", profile_picture = "" } = {},
    review_text = "리뷰 내용이 없습니다.",
    review_first_image_url = "",
    like_count = 0,
    goods_name = "",
  } = review;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/(community)/(main)/community")}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.gray500} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>굿즈리뷰 상세보기</Text>
        </View>
        {/* 상단 프로필 섹션 */}
        <View style={styles.reviewSection}>
          <View style={styles.headerSection}>
            <Image
              source={
                profile_picture
                  ? { uri: encodeURI(profile_picture) }
                  : require("../../../assets/images/background.png")
              }
              style={styles.profileImage}
              resizeMode="cover"
            />
            <View style={styles.userInfo}>
              <Text style={styles.profileName}>{nickname}</Text>
              <Text style={styles.profileDetails}>리뷰: 123개</Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="more-horiz" size={24} color={colors.orange200} />
            </TouchableOpacity>
          </View>

          {/* 이미지 섹션 */}
          {review_first_image_url ? (
            <Image
              source={{ uri: encodeURI(review_first_image_url) }}
              style={styles.reviewImage}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../../../assets/images/background.png")}
              style={styles.reviewImage}
              resizeMode="contain"
            />
          )}

          {/* 좋아요 섹션 */}
          <View style={styles.likeSection}>
            <MaterialIcons name="favorite" size={24} color={colors.orange200} />
            <Text style={styles.likeCount}>{like_count}</Text>
            <MaterialIcons name="chat-bubble-outline" size={24} color={colors.orange200} />
            <Text style={styles.commentCount}>20</Text>
          </View>

          {/* 리뷰 텍스트 섹션 */}
          <Text style={styles.reviewText}>{review_text}</Text>
        </View>
        {/* 매장 정보 섹션 */}
        <View style={styles.shopInfo}>
          <View style={styles.shopDetails}>
            <Text style={styles.shopName}>붕템샵</Text>
            <Text style={styles.shopAddress}>{goods_name}</Text>
            <TouchableOpacity style={styles.navigateButton}>
              <Text style={styles.navigateButtonText}>바로가기 →</Text>
            </TouchableOpacity>
          </View>
          {review_first_image_url ? (
            <Image
              source={{ uri: encodeURI(review_first_image_url) }} // 굿즈 썸네일사진
              style={styles.shopImage}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require('../../../assets/images/background.png')}
              style={styles.shopImage}
              resizeMode="contain"
            />
          )}
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 40,
  },
  container: {
    backgroundColor: colors.gray100,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderBottomColor: colors.gray200,
    borderBottomWidth: 1,
    position: "relative",
  },
  backButton: { position: "absolute", left: 10 },
  headerTitle: {
    ...typography.heading.small_bold,
    color: colors.gray500,
    textAlign: "center",
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewSection: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  profileImage: {
    width: 50, // 프로필 사진 크기
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#fff",
  },
  userInfo: { flex: 1 },
  profileName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  profileDetails: { fontSize: 14, color: "#888" },
  reviewImage: {
    width: "100%",
    height: 500,
    borderRadius: 8,
    marginBottom: 16,
  },
  reviewText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    marginBottom: 16,
    textAlign: "justify",
  },
  likeSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  likeCount: { marginLeft: 8, fontSize: 16, color: "#333", marginRight: 16 },
  shopInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.orange100,
    marginBottom: 16,
  },
  shopDetails: { flex: 1 },
  shopName: {
    ...typography.heading.small,
    color: colors.gray500
  },
  shopAddress: {
    ...typography.body.large,
    color: colors.gray500,
    marginBottom: 4
  },
  navigateButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  navigateButtonText: {
    ...typography.heading.small,
    color: colors.orange200
  },
  shopImage: { width: 120, height: 120, borderRadius: 8, marginLeft: 12 },
  errorText: { fontSize: 18, color: "red", textAlign: "center", marginTop: 50 },
});

export default GoodsReviewLook;
