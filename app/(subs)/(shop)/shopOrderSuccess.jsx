import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Image,
    Alert
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../src/styles/color';
import Typography from '../../../src/styles/typhography';
import { useCart } from '../../../src/services/CartContext';
import { STRINGS } from '../../../src/config/string';

const ShopOrderSuccess = () => {
    const router = useRouter();
    const {
        orderItems = '[]',
        usedPoints = 0,
        totalAmount = 0,
        paymentMethod = '',
        orderDate = '',
        deliveryAddress = '',
    } = useLocalSearchParams();

    const handleCancelOrder = () => {
        Alert.alert(
            '주문 취소',
            '정말 주문을 취소하시겠습니까?',
            [
                { text: '아니요', style: 'cancel' },
                { text: '예', onPress: () => router.push('/(subs)/(shop)/shopOrderCancel') },
            ],
            { cancelable: true }
        );
    };

    const parsedOrderItems = (() => {
        try {
            return JSON.parse(orderItems);
        } catch {
            return [];
        }
    })();

    const { clearCart } = useCart();

    const handleNavigateToShop = async () => {
        try {
            await clearCart(); // 장바구니 초기화 (비동기 처리)
            router.push('/(tabs)/(shop)/(main)/shop'); // 붕템샵으로 이동
        } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* 상단 네비게이션 */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.push('/shop')}>
                        <MaterialIcons name="arrow-back" size={24} color={Colors.gray500} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{STRINGS.BOONG_TAM.ORDER.ORDER}</Text>
                </View>

                {/* 주문 현황 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{STRINGS.BOONG_TAM.ORDER.BOONG_TAM_ORDER_VIEW}</Text>
                    <View style={styles.statusContainer}>
                        <Text style={styles.statusText}>{STRINGS.BOONG_TAM.PAY.SUCCESS_PAY}</Text>
                        <Text style={styles.statusSubText}>{STRINGS.BOONG_TAM.PAY.SUCCESS_PAY_DISCRIPTION}</Text>
                    </View>
                </View>

                {/* 주문 상품 정보 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{STRINGS.BOONG_TAM.ORDER.BOONG_TAM_ORDER_PRODUCT}</Text>
                    {parsedOrderItems.map((item, index) => (
                        <View key={index} style={styles.itemContainer}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>{item.price}</Text>
                        </View>
                    ))}
                </View>

                {/* 현재 주소지 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{STRINGS.BOONG_TAM.ORDER.ADDRESS_PRODUCT}</Text>
                    <Text style={styles.addressText}>{deliveryAddress}</Text>
                    <TouchableOpacity style={styles.trackButton}  onPress={() => router.push('/(subs)/(shop)/Address_api')}>
                        <Text style={styles.trackButtonText}>{STRINGS.BOONG_TAM.ORDER.INQUIRY}</Text>
                    </TouchableOpacity>
                </View>

                {/* 총 주문 금액 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{STRINGS.BOONG_TAM.PAY.TOTAL_PAYMENT}</Text>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>{STRINGS.BOONG_TAM.PAY.ORDER_AMOUNT}</Text>
                        <Text style={styles.priceValue}>{totalAmount.toLocaleString()}원</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>{STRINGS.BOONG_TAM.PAY.USE_POINT}</Text>
                        <Text style={styles.priceValue}>{usedPoints.toLocaleString()}P</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>{STRINGS.BOONG_TAM.PAY.FINAL_AMOUNT}</Text>
                        <Text style={styles.totalValue}>{(totalAmount - usedPoints).toLocaleString()}원</Text>
                    </View>
                    <View style={styles.paymentMethodRow}>
                        <Text style={styles.priceLabel}>{STRINGS.BOONG_TAM.PAY.PAYMENT_METHOD}</Text>
                        {paymentMethod === 'pay' ? (
                            <Image
                                style={styles.kakaoLogo}
                                source={require('../../../assets/icon/kakao_pay.png')}
                                resizeMode="contain"
                            />
                        ) : (
                            <Text style={styles.priceValue}>신용/체크카드</Text>
                        )}
                    </View>
                    <View style={styles.orderDateRow}>
                        <Text style={styles.priceLabel}>{STRINGS.BOONG_TAM.PAY.PAY_DAY}</Text>
                        <Text style={styles.priceValue}>{orderDate}</Text>
                    </View>
                </View>

                {/* 붕템샵으로 이동하기 버튼 */}
                <TouchableOpacity
                    style={styles.shopButton}
                    onPress={async () => {
                        try {
                            console.log('Clearing cart...');
                            await clearCart(); // 장바구니 초기화
                            console.log('Cart cleared, navigating to shop...');
                            router.push('/(tabs)/(shop)/(main)/shop'); // 붕템샵으로 이동
                        } catch (error) {
                            console.error('Error navigating to shop:', error);
                        }
                    }}
                >
                    <Text style={styles.shopButtonText}>{STRINGS.BOONG_TAM.INFO.GO_BOONGTEM}</Text>
                </TouchableOpacity>

                {/* 주문 취소 버튼 */}
                <TouchableOpacity onPress={handleCancelOrder} style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>{STRINGS.BOONG_TAM.ORDER.CANCEL_ORDER}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.gray100 },
    scrollContainer: { paddingBottom: 20 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray200,
    },
    backButton: { padding: 5 },
    headerTitle: {
        ...Typography.heading.small_bold,
        color: Colors.gray500,
        textAlign: 'center',
    },
    section: {
        backgroundColor: Colors.white,
        padding: 15,
        marginHorizontal: 15,
        marginBottom: 10,
        borderRadius: 5,
    },
    sectionTitle: {
        ...Typography.heading.small_bold,
        marginBottom: 10,
    },
    statusContainer: {
        alignItems: 'center',
        borderColor: Colors.orange100,
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        backgroundColor: Colors.orange50,
    },
    statusText: {
        ...Typography.heading.small_bold,
        color: Colors.orange100,
    },
    statusSubText: {
        ...Typography.body.medium,
        color: Colors.gray500,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray200,
    },
    itemName: {
        ...Typography.body.medium,
    },
    itemPrice: {
        ...Typography.body.medium,
        color: Colors.gray500,
    },
    addressText: {
        ...Typography.body.medium,
        marginBottom: 10,
    },
    trackButton: {
        backgroundColor: Colors.orange100,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    trackButtonText: {
        color: Colors.white,
        ...Typography.body.medium,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    priceLabel: { ...Typography.body.medium },
    priceValue: { ...Typography.body.medium },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: Colors.gray200,
        marginTop: 10,
        paddingTop: 10,
    },
    totalLabel: {
        ...Typography.heading.small_bold,
    },
    totalValue: {
        ...Typography.heading.small_bold,
    },
    paymentMethodRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    orderDateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    shopButton: {
        marginHorizontal: 15,
        marginTop: 20,
        backgroundColor: Colors.orange100,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    shopButtonText: {
        color: Colors.white,
        ...Typography.body.large_bold,
    },
    cancelButton: {
        marginHorizontal: 15,
        marginTop: 20,
        backgroundColor: Colors.orange100,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: Colors.white,
        ...Typography.body.large_bold,
    },
    kakaoLogo: {
        width: 40,
        height: 20,
    },
});

export default ShopOrderSuccess;
