import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import ReviewCard from '../../../../src/components/reviewcard';
import colors from '../../../../src/styles/color';
import {
  fetchPopularStoreReviews,
  fetchStoreReviews,
  fetchGoodsReviews,
} from '../../../../src/services/communityService';

export default function CommunityScreen() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState({});
  const [popularReviews, setPopularReviews] = useState([]);
  const [storeReviews, setStoreReviews] = useState([]);
  const [goodsReviews, setGoodsReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // 데이터 로드 함수
  const loadReviews = async () => {
    try {
      const popular = await fetchPopularStoreReviews('popular', 5); // 인기 매장 리뷰
      const stores = await fetchStoreReviews('latest', 10); // 최신 매장 리뷰
      const goods = await fetchGoodsReviews('latest', 10); // 최신 굿즈 리뷰

      setPopularReviews(popular.data || []);
      setStoreReviews(stores.data || []);
      setGoodsReviews(goods.data || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 마운트되었을 때 데이터 로드
  useEffect(() => {
    loadReviews();
  }, []);

  // 매장 리뷰 카드 렌더링
  const renderStoreReview = ({ item }) => (
    <Link
      href={{
        pathname: "(subs)/(community)/store_review_look", // 매장 리뷰 상세 화면으로 이동
        params: { review: JSON.stringify(item) }, // 매장 리뷰 데이터를 전달
      }}
      style={{ textDecorationLine: "none" }}
    >
      <ReviewCard
        nickname={item.user_simple_info?.nickname || "익명"}
        review_date={item.review_date}
        profile_picture={{ uri: item.user_simple_info?.profile_picture || "" }}
        review_first_image_url={{ uri: item.review_first_image_url || "" }}
        store_name={item.store_name}
        review_text={item.review_text}
      />
    </Link>
  );

  // 굿즈 리뷰 카드 렌더링
  const renderGoodsReview = ({ item }) => (
    <Link
      href={{
        pathname: "(subs)/(community)/goods_review_look", // 굿즈 리뷰 상세 화면으로 이동
        params: { review: JSON.stringify(item) }, // 굿즈 리뷰 데이터를 전달
      }}
      style={{ textDecorationLine: "none" }}
    >
      <ReviewCard
        nickname={item.user_simple_info?.nickname || "익명"}
        review_date={item.review_date}
        profile_picture={{ uri: item.user_simple_info?.profile_picture || "" }}
        review_first_image_url={{ uri: item.review_first_image_url || "" }}
        goods_name={item.goods_name}
        review_text={item.review_text}
      />
    </Link>
  );

  

  const toggleMoreMenu = (section) => {
    setIsMoreMenuOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const closeMoreMenu = () => {
    setIsMoreMenuOpen({});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          {loading ? (
            <Text style={styles.loadingText}>로딩 중...</Text>
          ) : (
            <>
              {/* 인기 컨텐츠 섹션 */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitlePopular}>인기 컨텐츠</Text>
                  <FlatList
                    data={popularReviews}
                    renderItem={renderStoreReview}
                    keyExtractor={(item) => item.store_review_id.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContainer}
                    ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
                    ListEmptyComponent={() => (
                      <Text style={{ textAlign: 'center', color: 'gray' }}>데이터가 없습니다.</Text>
                    )}
                  />
                </View>
              </View>

              {/* 매장 리뷰 섹션 */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionHeader_min}> 
                    <Text style={styles.sectionTitle}>매장 리뷰</Text>
                    <TouchableOpacity
                      onPress={() => router.push("/(tabs)/(community)/(main)/community")}
                      style={styles.moreButton}
                    >
                      <View style={styles.container_arrow}>
                        <MaterialIcons name="add" size={24} color={colors.white} />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={storeReviews}
                    renderItem={renderStoreReview}
                    keyExtractor={(item) => item.store_review_id.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContainer}
                    ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
                    ListEmptyComponent={() => (
                      <Text style={{ textAlign: 'center', color: 'gray' }}>데이터가 없습니다.</Text>
                    )}
                  />
                </View>
                
              </View>

              {/* 굿즈 리뷰 섹션 */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionHeader_min}>
                    <Text style={styles.sectionTitle}>굿즈 리뷰</Text>
                    <TouchableOpacity
                      onPress={() => router.push("/(tabs)/(community)/(main)/community")}
                      style={styles.moreButton}
                    >
                      <View style={styles.container_arrow}>
                        <MaterialIcons name="add" size={24} color={colors.white} />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={goodsReviews}
                    renderItem={renderGoodsReview}
                    keyExtractor={(item) => item.goods_review_id.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContainer}
                    ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
                    ListEmptyComponent={() => (
                      <Text style={{ textAlign: 'center', color: 'gray' }}>데이터가 없습니다.</Text>
                    )}
                  />
                </View>
                
                {/* + 버튼 */}
                <TouchableOpacity
                  style={styles.floatingButton}
                  onPress={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <MaterialIcons name="add" size={28} color="white" />
                </TouchableOpacity>

                {/* 메뉴 모달 */}
                {isMenuOpen && (
                  <Modal transparent={true} animationType="fade">
                    <TouchableOpacity
                      style={styles.overlay}
                      onPress={() => setIsMenuOpen(false)}
                    />
                    <View style={styles.menu}>
                      <Link href="(subs)/(community)/submit_store" style={styles.menuItem}>
                        <Text style={styles.menuText}>매장 제보하기</Text>
                      </Link>
                      <Link href="(subs)/(community)/shop_review_write" style={styles.menuItem}>
                        <Text style={styles.menuText}>매장 리뷰 쓰기</Text>
                      </Link>
                      <Link href="(subs)/(community)/goods_review_write" style={styles.menuItem}>
                        <Text style={styles.menuText}>굿즈 리뷰 쓰기</Text>
                      </Link>
                    </View>
                  </Modal>
                )}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 5,
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  sectionTitlePopular: {
    fontSize: 24,
    marginBottom: 4,
    fontWeight: 'bold',
    color: '#FF9900',
  },
  sectionHeader: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sectionHeader_min: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9900',
  },
  moreButton: {
    marginTop: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#FF9900',
    borderRadius: 4,
    alignItems: 'center',
  },
  cardSeparator: {
    width: 8,
  },
  flatListContainer: {
    paddingBottom: 16,
  },
  modalContainer: {
    position: 'absolute',
    top: 45,
    right: 55,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  modalText: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 8,
    color: '#000',
  },
  loadingText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF9900",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menu: {
    position: "absolute",
    bottom: 100,
    right: 20,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 5,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  menuItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    fontSize: 16,
    color: "#000",
  },
});
