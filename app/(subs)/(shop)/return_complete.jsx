import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import colors from '../../../src/styles/color';
import typography from '../../../src/styles/typhography';
import { STRINGS } from '../../../src/config/string'

export default function ReturnCompleteScreen() {
  const { items, reason, selectedOption, address } = useLocalSearchParams();

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
        <Link href="(/(subs)/(shop)/productdetail" style={styles.button}>
          <Text style={styles.buttonText}>{STRINGS.SHOP.RETURN_COMPLETE.RETURN_ORDER_VIEW}</Text>
        </Link>
        <Link href="/(tabs)/(shop)/(main)/shop" style={styles.button}>
          <Text style={styles.buttonText}>{STRINGS.SHOP.RETURN_COMPLETE.RETURN_SHOPPING_CONTINUE}</Text>
        </Link>
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
    width: '80%',
  },
  button: {
    backgroundColor: colors.orange300,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    ...typography.body.large_bold,
    color: colors.white,
  },
});
