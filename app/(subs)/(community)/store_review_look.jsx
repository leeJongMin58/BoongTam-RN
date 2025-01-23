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

const ReviewLook = () => {
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

  // 이미지 배열 변환
  const storeReviewPhotos = review?.store_review_photo_url
    ? review.store_review_photo_url.split(",")
    : []; // 쉼표로 구분된 문자열을 배열로 변환

  // 매장 리뷰인지 확인
  const isStoreReview = review?.store_id !== undefined;

  if (!review || !isStoreReview) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>매장 리뷰 데이터를 불러올 수 없습니다.</Text>
      </SafeAreaView>
    );
  }

  const {
    user_simple_info: { nickname = "익명", profile_picture = "" } = {},
    review_text = "리뷰 내용이 없습니다.",
    store_name = "상점 정보 없음",
    review_rating = 0,
    like_count = 0,
    store_review_photo_url = "",
    address = ""
  } = review;
  console.log('revieimg', store_review_photo_url)

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/(community)/(main)/community")}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.gray500} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>매장리뷰 상세보기</Text>
        </View>

        {/* 리뷰 전체 섹션 */}
        <View style={styles.reviewSection}>
          {/* 상단 프로필 섹션 */}
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

          {/* 별점 섹션 */}
          <View style={styles.ratingContainer}>
            {[...Array(5)].map((_, index) => {
              if (index < Math.floor(review_rating)) {
                // 채워진 별
                return (
                  <MaterialIcons key={index} name="star" size={24} color={colors.orange200} />
                );
              } else if (index === Math.floor(review_rating) && review_rating % 1 !== 0) {
                // 반쪽 별
                return (
                  <MaterialIcons key={index} name="star-half" size={24} color={colors.orange200} />
                );
              } else {
                // 빈 별
                return (
                  <MaterialIcons key={index} name="star-border" size={24} color={colors.orange200} />
                );
              }
            })}
          </View>

          {/* 이미지 섹션 */}
          {storeReviewPhotos.length > 0 ? (
            <ScrollView horizontal contentContainerStyle={styles.imageScroll}>
              {storeReviewPhotos.map((photoUrl, index) => (
                <View key={index} style={styles.imageContainer}>
                  {/* 이미지 */}
                  <Image
                    source={{ uri: encodeURI(photoUrl.trim()) }} // 공백 제거 후 URI 인코딩
                    style={styles.reviewImage}
                    resizeMode="contain"
                  />
                  {/* 구분선 */}
                  {index < storeReviewPhotos.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))}
            </ScrollView>
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
          </View>

          {/* 리뷰 텍스트 섹션 */}
          <Text style={styles.reviewText}>{review_text}</Text>
        </View>

        {/* 매장 정보 섹션 */}
        <View style={styles.shopInfo}>
          <View style={styles.shopDetails}>
            <Text style={styles.shopName}>{store_name}</Text>
            <Text style={styles.shopAddress}>{address}</Text>
            <TouchableOpacity
              onPress={() => router.push("/(subs)/(boongtam)/boongtamDetail")}
              style={styles.navigateButton}>
              <Text style={styles.navigateButtonText}>바로가기 →</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require("../../../assets/images/placeHolder.png")}
            style={styles.shopImage}
            resizeMode="cover"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.gray100,
    marginTop: 40,
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  reviewSection: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
    borderWidth: 2,
    borderColor: colors.white,
  },
  userInfo: { flex: 1 },
  profileName: {
    ...typography.body.large_bold,
    color: colors.gray500,
  },
  profileDetails: {
    color: colors.gray500,
    ...typography.body.medium
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  reviewImage: {
    width: 300, // 이미지 크기
    height: 200,
    borderRadius: 8,
    marginHorizontal: 10, // 이미지 간 간격
  },
  likeSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  likeCount: { marginLeft: 8, fontSize: 16, color: colors.gray500, marginRight: 16 },
  commentCount: { marginLeft: 8, fontSize: 16, color: colors.gray500 },
  reviewText: {
    ...typography.heading.medium,
    color: colors.gray500,
    textAlign: "justify",
  },
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
  imageScroll: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 16,
  },
  navigateButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    width: 2,
    height: 150,
    backgroundColor: colors.white,
    borderColor: colors.gray100, // 디버깅용
    borderWidth: 1,     // 디버깅용
    marginHorizontal: 10,
  },
  navigateButtonText: {
    ...typography.heading.small,
    color: colors.orange200
  },
  shopImage: { width: 120, height: 120, borderRadius: 8, marginLeft: 12 },
  errorText: { fontSize: 18, color: "red", textAlign: "center", marginTop: 50 },
});

export default ReviewLook;