import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams, Link, useRouter } from 'expo-router';
import colors from '../../../src/styles/color';
import typography from '../../../src/styles/typhography';
import { STRINGS } from '../../../src/config/string'
import { useCart } from '../../../src/services/CartContext';

export default function ReturnCompleteScreen() {
  const { items, reason, selectedOption, address } = useLocalSearchParams();
  const { clearCart } = useCart();
  const router = useRouter();
  
  const handleContinueShopping = () => {
    clearCart(); // 장바구니 비우기
    router.replace('(tabs)/(shop)/shop'); // 히스토리 초기화 후 쇼핑 메인 화면으로 이동
  };

  return (
    <View style={styles.container}>

      {/* 상단 텍스트 */}
      <Text style={styles.title}>{STRINGS.SHOP.RETURN_COMPLETE.RETURN_COMPLTETE}</Text>

      {/* 아이콘 */}
      <View style={styles.iconContainer}>
        <View style={styles.icon}>
          <Text style={styles.checkMark}>✔</Text>
        </View>
      </View>

      {/* 완료 메시지 */}
      <Text style={styles.message}>
        {STRINGS.SHOP.RETURN_COMPLETE.RETURN_COMPLTETE_TEXT1}
        {'\n'}
        {STRINGS.SHOP.RETURN_COMPLETE.RETURN_COMPLTETE_TEXT2}
      </Text>

      {/* 반품 정보 */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{STRINGS.SHOP.RETURN_COMPLETE.RETURN_INFO_CAUSE} {reason}</Text>
        <Text style={styles.infoText}>{STRINGS.SHOP.RETURN_COMPLETE.RETURN_INFO_METHOD} {selectedOption}</Text>
        <Text style={styles.infoText}>{STRINGS.SHOP.RETURN_COMPLETE.RETURN_INFO_ADDRESS} {address}</Text>
      </View>

      {/* 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
              onPress={() => router.replace('(subs)/(my)/my_page_review')}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                {STRINGS.SHOP.CHANGE_COMPLETE.CHANGE_ORDER_VIEW}
              </Text>
            </TouchableOpacity>

            {/* 쇼핑하기 버튼 */}
            <TouchableOpacity
              onPress={handleContinueShopping}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                {STRINGS.SHOP.CHANGE_COMPLETE.CHANGE_SHOPPING_CONTINUE}
              </Text>
            </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    ...typography.heading.medium,
    color: colors.gray500,
    marginBottom: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    backgroundColor: colors.orange100,
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    ...typography.display.medium,
    color: colors.white,
    fontWeight: 'bold',
  },
  message: {
    ...typography.body.large,
    textAlign: 'center',
    color: colors.gray500,
    marginBottom: 30,
  },
  infoContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  infoText: {
    ...typography.body.medium,
    color: colors.gray400,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: colors.orange300,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    ...typography.body.large_bold,
    color: colors.white,
    textAlign: 'center',
  },
});
