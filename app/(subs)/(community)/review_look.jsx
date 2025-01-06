import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../src/styles/color";
import popularContent from "./review_list";

export default function ReviewLookScreen() {
  const { id } = useLocalSearchParams(); // 전달된 id 값 수신
  const [review, setReview] = useState(null);

  useEffect(() => {
    if (id) {
      const selectedReview = popularContent.find((item) => item.id === id); // 문자열로 비교
      setReview(selectedReview);
    }
  }, [id]);

  if (!review) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>리뷰를 불러오는 중...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 상단 프로필 섹션 */}
      <View style={styles.header}>
        <Image source={{ uri: review.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.profileName}>{review.username}</Text>
          <Text style={styles.profileDetails}>평점: {review.rating}</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="more-horiz" size={24} color={colors.orange200} />
        </TouchableOpacity>
      </View>

      {/* 별점 섹션 */}
      <View style={styles.ratingContainer}>
        {[...Array(Math.floor(review.rating))].map((_, index) => (
          <MaterialIcons key={index} name="star" size={20} color={colors.orange200} />
        ))}
        {review.rating % 1 !== 0 && (
          <MaterialIcons name="star-half" size={20} color={colors.orange200} />
        )}
      </View>

      {/* 이미지 섹션 */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
        <Image source={review.image} style={styles.reviewImage} />
      0</ScrollView>

      {/* 리뷰 텍스트 섹션 */}
      <Text style={styles.reviewText}>{review.text}</Text>

      {/* 매장 정보 섹션 */}
      <View style={styles.shopInfo}>
        <View style={styles.shopDetails}>
          <Text style={styles.shopName}>황금 잉어빵</Text>
          <Text style={styles.shopAddress}>서울시 강남구 역삼동 ...</Text>
          <TouchableOpacity style={styles.navigateButton}>
            <Text style={styles.navigateButtonText}>바로가기 →</Text>
          </TouchableOpacity>
        </View>
        <Image source={{ uri: "https://via.placeholder.com/100" }} style={styles.shopImage} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#fff", padding: 20 },
  loadingText: { fontSize: 18, textAlign: "center", marginTop: 50 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  userInfo: { flex: 1 },
  profileName: { fontSize: 16, fontWeight: "bold" },
  profileDetails: { fontSize: 12, color: "#888" },
  ratingContainer: { flexDirection: "row", marginBottom: 16 },
  imageScroll: { marginBottom: 16 },
  reviewImage: { width: 150, height: 100, borderRadius: 10, marginRight: 10 },
  reviewText: { fontSize: 14, color: "#333", marginBottom: 16 },
  shopInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.orange200,
  },
  shopDetails: { flex: 1 },
  shopName: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  shopAddress: { fontSize: 12, color: "#fff", marginBottom: 5 },
  navigateButton: {
    alignSelf: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  navigateButtonText: { fontSize: 12, color: colors.orange200 },
  shopImage: { width: 80, height: 80, borderRadius: 10, marginLeft: 10 },
});
