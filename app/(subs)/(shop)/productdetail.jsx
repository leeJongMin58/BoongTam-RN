import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import colors from '../../../src/styles/color';
import { useLocalSearchParams, Link } from 'expo-router'; // useLocalSearchParams와 Link 가져오기
import { useCart } from '../../../src/services/CartContext'; // CartContext 가져오기
import typography from '../../../src/styles/typhography';
import { STRINGS } from '../../../src/config/string';
import reviews from './Review_list';

export default function ProductDetailScreen() {
  const { id, name, price, image } = useLocalSearchParams(); // 전달받은 params 가져오기
  const [selectedTab, setSelectedTab] = useState('description'); // 현재 선택된 탭
  const { cart, addToCart, setCart } = useCart(); // CartContext에서 addToCart 함수 가져오기
  React.useEffect(() => {
    const resetCart = async () => {
      await AsyncStorage.removeItem('cart'); // 장바구니 데이터 삭제
      setCart([]); // 상태 초기화
    };
    resetCart();
  }, []);

  if (!id || !image) {
    // id 또는 image가 없을 경우 에러 메시지 표시
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{STRINGS.SHOP.PRODUCT_DETAIL.ERROR.FETCH_FAILED}</Text>
      </View>
    );
  }

  // 장바구니에 상품 추가 후 알림
  const handleAddToCart = () => {
    addToCart({ id, name, price, image }); // 상품을 장바구니에 추가
    Alert.alert(
      STRINGS.SHOP.PRODUCT_DETAIL.POCKET,
      STRINGS.SHOP.PRODUCT_DETAIL.ALERTS.ADD_TO_CART_SUCCESS
    );
  };

  const renderReview = ({ item }) => (
    <View style={styles.reviewItem}>
      <Text style={styles.reviewUser}>{item.user}</Text>
      <Text style={styles.reviewComment}>{item.comment}</Text>
      <Text style={styles.reviewRating}>{STRINGS.SHOP.PRODUCT_DETAIL.REVIEWS.RATING_TEXT} {item.rating} / 5</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 상품 상세 정보 */}
      <View style={styles.productContainer}>
        <Image source={image} style={styles.productImage} />
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productPrice}>{price}</Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={handleAddToCart} // 장바구니 추가 함수 호출
          >
            <Text style={styles.cartButtonText}>{STRINGS.SHOP.PRODUCT_DETAIL.BUTTONS.ADD_TO_CART}</Text>
          </TouchableOpacity>
          <Link
            href={{
              pathname: '/(subs)/(shop)/product_cart',
            }}
            style={styles.buyButton}
          >
            <Text style={styles.buyButtonText}>{STRINGS.SHOP.PRODUCT_DETAIL.BUTTONS.BUY_NOW}</Text>
          </Link>
        </View>
      </View>

      {/* 탭 메뉴 */}
      <View style={styles.tabMenu}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'description' && styles.tabButtonSelected,
          ]}
          onPress={() => setSelectedTab('description')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'description' && styles.tabTextSelected,
            ]}
          >
            {STRINGS.SHOP.PRODUCT_DETAIL.TABS.DESCRIPTION}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'reviews' && styles.tabButtonSelected,
          ]}
          onPress={() => setSelectedTab('reviews')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'reviews' && styles.tabTextSelected,
            ]}
          >
            {STRINGS.SHOP.PRODUCT_DETAIL.TABS.REVIEWS}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 탭 내용 */}
      {selectedTab === 'description' ? (
        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            {name}{STRINGS.SHOP.PRODUCT_DETAIL.DESCRIPTION.DEFAULT}
          </Text>
        </View>
      ) : (
        <FlatList
          data={reviews}
          renderItem={renderReview}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.reviewList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray200,
  },
  productContainer: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    marginBottom: 8,
    marginTop: 50,
  },
  productImage: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  productName: {
    ...typography.heading.small_bold,
    color: colors.gray500,
    marginBottom: 8,
  },
  productPrice: {
    ...typography.body.large_bold,
    color: colors.orange200,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cartButton: {
    flex: 1,
    marginRight: 8,
    padding: 12,
    backgroundColor: colors.gray300,
    alignItems: 'center',
    borderRadius: 8,
  },
  cartButtonText: {
    ...typography.body.large,
    color: colors.gray500,
  },
  buyButton: {
    flex: 1,
    marginLeft: 8,
    padding: 12,
    backgroundColor: colors.orange300,
    textAlign: 'center',
    borderRadius: 8,
  },
  buyButtonText: {
    ...typography.body.large_bold,
    color: colors.white,
  },
  tabMenu: {
    flexDirection: 'row',
    backgroundColor: colors.gray100,
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  tabButton: {
    paddingVertical: 8,
  },
  tabButtonSelected: {
    borderBottomWidth: 2,
    borderBottomColor: colors.orange200,
  },
  tabText: {
    ...typography.body.large,
    color: colors.gray500,
  },
  tabTextSelected: {
    ...typography.body.large_bold,
    color: colors.orange200,
  },
  description: {
    padding: 16,
    backgroundColor: colors.white,
  },
  descriptionText: {
    ...typography.body.small,
    color: colors.gray500,
  },
  reviewList: {
    padding: 16,
    backgroundColor: colors.white,
  },
  reviewItem: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
    paddingBottom: 8,
  },
  reviewUser: {
    ...typography.body.small_bold,
    color: colors.gray500,
  },
  reviewComment: {
    ...typography.label.large,
    color: colors.gray500,
    marginTop: 4,
  },
  reviewRating: {
    ...typography.label.large,
    color: colors.orange200,
    marginTop: 4,
  },
});
