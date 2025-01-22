import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Material Icons 추가
import { Link, useRouter } from 'expo-router'; // Link 컴포넌트 추가
import colors from '../../../src/styles/color';
import typography from '../../../src/styles/typhography';
import { fetchStoreReviews } from '../../../src/usecases/communityUsecase';

const ReviewScreen = () => {
  const [storeReviews, setStoreReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // 데이터 로드 함수
  const loadReviews = async () => {
    try {
      setLoading(true);
      const response = await fetchStoreReviews('latest', 10); // 최신 매장 리뷰 호출
      setStoreReviews(response?.data || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
      setError('리뷰를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ActivityIndicator size="large" color={colors.gray500} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.safeContainer}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Link href="(tabs)/(my)/my" style={styles.backbutton}>
            <MaterialIcons name="arrow-back" size={24} color={colors.gray500} />
          </Link>
          <Text style={styles.headerTitle}>매장 리뷰</Text>
        </View>

        {/* 본문 내용 */}
        <View style={styles.screenContainer}>
          {storeReviews.map((review) => (
            <TouchableOpacity
              key={review.store_review_id}
              onPress={() =>
                router.push({
                  pathname: "/(subs)/(community)/store_review_look",
                  params: { review: JSON.stringify(review) }, // 리뷰 데이터를 JSON으로 전달
                })
              }
              style={styles.cardContainer}>
              {/* Header */}
              <View style={styles.headerContainer}>
                <Image
                  source={
                    review.user_simple_info.profile_picture
                      ? { uri: review.user_simple_info.profile_picture }
                      : require('../../../assets/images/background.png') // 기본 이미지
                  }
                  style={styles.profileImage}
                />
                <View style={styles.profileInfoContainer}>
                  <Text style={styles.userName}>{review.user_simple_info.nickname}</Text>
                  <Text style={styles.userInfo}>
                    리뷰: {review.like_count}개
                  </Text>
                  {/* 별점 */}
                  <View style={styles.starContainer}>
                    {[...Array(5)].map((_, index) => (
                      <MaterialIcons
                        key={index}
                        name={
                          index < review.review_rating ? 'star' : 'star-border'
                        }
                        size={20}
                        color={colors.orange200}
                        style={{ marginRight: -3 }}
                      />
                    ))}
                  </View>
                </View>
              </View>

              {/* 이미지 리스트 */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.imageContainer}
              >
                {review.store_review_photo_url.split(',').map((url, index) => (
                  <Image
                    key={index}
                    source={{ uri: url }}
                    style={styles.productImage}
                  />
                ))}
              </ScrollView>

              {/* Like and Comment Section */}
              <View style={styles.actionContainer}>
                <View style={styles.actionItem}>
                  <MaterialIcons name="favorite" size={24} color={colors.orange200} />
                  <Text style={styles.actionText}>{review.like_count}</Text>
                </View>
                <View style={styles.actionItem}>
                  <MaterialIcons name="chat-bubble-outline" size={24} color={colors.gray300} />
                  <Text style={styles.actionText}>{review.comment_count}</Text>
                </View>
              </View>

              {/* Review Text */}
              <Text style={styles.reviewText}>{review.review_text}</Text>

              {/* Shop Info */}
              <Link
                href={{
                  pathname: '(tabs)/(shop)/shop',
                }}
                style={styles.link}
              >
                <View style={[styles.shopInfo, { height: 180 }]}>
                  <View style={styles.shopInfodata}>
                    <Text style={styles.shopName}>{review.store_name}</Text>
                    <Text style={styles.shopAddress}>{review.address}</Text>
                    <TouchableOpacity 
                    onPress={() => router.push("/(subs)/(boongtam)/boongtamDetail")}
                    style={styles.shopButton}>
                      <Text style={styles.buttonText}>바로가기 →</Text>
                    </TouchableOpacity>
                  </View>
                  <Image
                    source={
                      review.thumbnail_url
                        ? { uri: review.thumbnail_url }
                        : require('../../../assets/images/placeHolder.png')
                    }
                    style={styles.ArrowImage}
                    resizeMode="contain" // 이미지가 컨테이너를 가득 채우되 비율을 유지
                  />
                </View>
              </Link>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.gray100,
    marginTop: 35
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.gray100,
    padding: 16
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200
  },
  backbutton: {
    position: 'absolute',
    left: 10
  },
  headerTitle: {
    ...typography.heading.small_bold,
    color: colors.gray500,
    textAlign: 'center'
  },
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15
  },
  profileInfoContainer: { flex: 1 },
  userName: { ...typography.body.large_bold, color: colors.gray500 },
  userInfo: { ...typography.body.medium, color: colors.gray400 },
  starContainer: { flexDirection: 'row', marginTop: 4 },
  imageContainer: { flexDirection: 'row', marginVertical: 5 },
  productImage: { width: 120, height: 120, borderRadius: 8, marginRight: 10 },
  actionContainer: { flexDirection: 'row', marginVertical: 12 },
  actionItem: { flexDirection: 'row', alignItems: 'center', marginRight: 16 },
  actionText: { marginLeft: 6, ...typography.body.medium, color: colors.gray400 },
  reviewText: { ...typography.body.medium, color: colors.gray500, marginVertical: 8 },
  shopInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.orange100,
    marginBottom: 16,
  },
  shopInfodata: { flex: 1 },
  shopName: { ...typography.heading.medium, color: colors.gray500 },
  shopAddress: { ...typography.body.medium, color: colors.gray400, marginBottom: 8 },
  shopButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  buttonText: { ...typography.heading.small, color: colors.orange200 },
  ArrowImage: { width: 130, height: 130, borderRadius: 8, marginLeft: 12 },
  errorText: { fontSize: 16, color: colors.red, textAlign: 'center', marginTop: 20 },
});

export default ReviewScreen;
