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
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import colors from '../../../src/styles/color';
import typography from '../../../src/styles/typhography';
import { fetchGoodsReviews } from '../../../src/usecases/communityUsecase';

export default function ReviewScreen() {
  const router = useRouter();
  const [goodsReviews, setGoodsReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 데이터 로드 함수
  const loadReviews = async () => {
    try {
      setLoading(true);
      const goods = await fetchGoodsReviews('latest', 10); // 최신 굿즈 리뷰
      setGoodsReviews(goods?.data || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
      setError('리뷰를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 마운트되었을 때 데이터 로드
  useEffect(() => {
    loadReviews();
  }, []);

  // 로딩 상태 처리
  if (loading) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ActivityIndicator size="large" color={colors.gray500} />
      </SafeAreaView>
    );
  }

  // 오류 상태 처리
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
        <View style={styles.header1}>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/(community)/(main)/community')}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.gray500} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>굿즈리뷰</Text>
        </View>

        {/* 본문 내용 */}
        <View style={styles.screenContainer}>
          {goodsReviews.length > 0 ? (
            goodsReviews.map((review) => (
              <TouchableOpacity
                key={review.goods_review_id}
                onPress={() =>
                  router.push({
                    pathname: "/(subs)/(community)/goods_review_look",
                    params: { review: JSON.stringify(review) }, // 리뷰 데이터를 JSON으로 전달
                  })
                }
                style={styles.cardContainer}>

                  {/* 헤더 */}
                  <View style={styles.header}>
                    <View style={styles.header2}>
                      <Image
                        source={
                          review.user_simple_info.profile_picture
                            ? { uri: review.user_simple_info.profile_picture }
                            : require('../../../assets/images/background.png') // 기본 이미지
                        }
                        style={styles.profileImage}
                      />
                      <View style={styles.headerTextContainer}>
                        <Text style={styles.userName}>{review.user_simple_info.nickname}</Text>
                        <Text style={styles.userInfo}>리뷰: 12개</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.moreButton}>
                      <MaterialIcons name="more-vert" size={24} color={colors.gray500} />
                    </TouchableOpacity>
                  </View>

                  {/* 이미지 리스트 */}
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.imageContainer}
                  >
                    {review.goods_review_photo_url.split(',').map((url, index) => (
                      <Image
                        key={index}
                        source={{ uri: url }}
                        style={styles.productImage}
                      />
                    ))}
                  </ScrollView>

                  {/* 좋아요 및 댓글 */}
                  <View style={styles.actionContainer}>
                    <View style={styles.actionItem}>
                      <MaterialIcons name="favorite" size={24} color={colors.orange200} />
                      <Text style={styles.actionText}>{review.like_count}</Text>
                    </View>
                    <View style={styles.actionItem}>
                      <MaterialIcons name="chat-bubble-outline" size={24} color={colors.orange200} />
                      <Text style={styles.actionText}>21</Text>
                    </View>
                  </View>

                  {/* 리뷰 텍스트 */}
                  <Text style={styles.reviewText}>{review.review_text}</Text>

                  {/* 매장 정보 섹션 */}
                  <View style={[styles.shopInfo, { height: 150 }]}>
                    <View style={styles.shopDetails}>
                      <Text style={styles.shopName}>붕템샵</Text>
                      <Text style={styles.shopAddress}>{review.goods_name}</Text>
                      <TouchableOpacity style={styles.navigateButton}>
                        <Text style={styles.navigateButtonText}>바로가기 →</Text>
                      </TouchableOpacity>
                    </View>
                    {review.goods_image_url ? (
                      <Image
                        source={{ uri: review.goods_image_url }} // 굿즈 썸네일사진
                        style={styles.shopImage}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        source={require('../../../assets/images/background.png')} // 기본 이미지
                        style={styles.shopImage}
                        resizeMode="contain"
                      />
                    )}
                  </View>
              </TouchableOpacity>
            ))
          ) : (
            // 데이터가 없을 때 메시지 표시
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>리뷰가 없습니다.</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.gray100,
    marginTop: 40,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.gray100,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  header1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderBottomColor: colors.gray200,
    borderBottomWidth: 1,
    position: "relative",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 50,
    borderBottomColor: colors.gray200,
    borderBottomWidth: 1,
    position: "relative",
  },
  moreButton: {
    marginBottom: 10,
    // marginRight: -10,
    // marginLeft: 'auto',
  },
  backButton: { position: 'absolute', left: 10 },
  headerTitle: {
    ...typography.heading.small_bold,
    color: colors.gray500,
    textAlign: 'center',
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
    elevation: 3,
  },
  header2: {
    flexDirection: 'row',
  },
  headerTextContainer: {
    flex: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    marginLeft: 25,
    marginBottom: 5
  },
  userName: {
    ...typography.body.large_bold,
    color: colors.gray500,
    marginTop: 5
  },
  userInfo: {
    ...typography.body.medium,
    color: colors.gray400,
  },
  imageContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    marginLeft: 6,
    ...typography.body.medium,
    color: colors.gray400,
  },
  reviewText: {
    ...typography.body.medium,
    color: colors.gray500,
    marginVertical: 8,
  },
  shopInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.orange100,
    marginBottom: 16,
  },
  shopDetails: {
    flex: 1,
  },
  shopName: {
    ...typography.heading.medium,
    color: colors.gray500,
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
  shopImage: {
    width: 130,
    height: 130,
    borderRadius: 8,
    marginLeft: 12,
  },
  emptyContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray400,
  },
  errorText: {
    fontSize: 16,
    color: colors.red,
    textAlign: 'center',
    marginTop: 20,
  },
});
