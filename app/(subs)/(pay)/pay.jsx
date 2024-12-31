import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../src/styles/color';
import Typography from '../../../src/styles/typhography';

const CheckoutScreen = () => {
    const router = useRouter();
    const { selectedItems } = useLocalSearchParams();

    const parsedItems = selectedItems ? JSON.parse(selectedItems) : [];
    const [points, setPoints] = useState('');
    const [usedPoints, setUsedPoints] = useState(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const calculateTotalAmount = () => {
        return parsedItems.reduce((total, item) => {
            // "5,000원" 형태의 문자열에서 숫자만 추출하고 변환
            const price = parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0;
            const quantity = item.quantity || 0; // quantity가 없을 경우 0으로 처리
            return total + price * quantity;
        }, 0); // 초기값 0
    };

    const finalAmount = Math.max(0, calculateTotalAmount() - usedPoints);

    const applyPoints = () => {
        const pointValue = parseInt(points, 10);
        if (isNaN(pointValue) || pointValue % 100 !== 0) {
            Alert.alert('알림', '100p 단위로 입력해주세요.');
            return;
        }
        setUsedPoints(pointValue);
    };

    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
    };

    const handleCheckout = () => {
        if (!selectedPaymentMethod) {
            Alert.alert('알림', '결제 수단을 선택해주세요.');
            return;
        }

        Alert.alert('결제 완료', '결제가 성공적으로 완료되었습니다.', [
            { text: '확인', onPress: () => router.push('/boongtamOrderSuccess') },
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={parsedItems}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    <>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                                <MaterialIcons name="arrow-back" size={24} color={Colors.gray500} />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>주문하기</Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>주문 상품 정보</Text>
                        </View>
                    </>
                }
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image source={item.image} style={styles.itemImage} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>{item.price.toLocaleString()}원</Text>
                        </View>
                        <Text style={styles.itemQuantity}>{item.quantity}개</Text>
                    </View>
                )}
                ListFooterComponent={
                    <>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>포인트</Text>
                            <View style={styles.pointContainer}>
                                <TextInput
                                    style={styles.pointInput}
                                    placeholder="100P 단위로 사용 가능"
                                    keyboardType="numeric"
                                    value={points}
                                    onChangeText={setPoints}
                                />
                                <TouchableOpacity onPress={applyPoints} style={styles.applyButton}>
                                    <Text style={styles.applyButtonText}>적용</Text>
                                </TouchableOpacity>
                                <Text style={styles.boongPoint}>붕 포인트: {usedPoints}P</Text>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>총 주문 금액</Text>
                            <View style={styles.priceRow}>
                                <Text style={styles.priceLabel}>주문 금액</Text>
                                <Text style={styles.priceValue}>{calculateTotalAmount().toLocaleString()}원</Text>
                            </View>
                            <View style={styles.priceRow}>
                                <Text style={styles.priceLabel}>포인트 사용</Text>
                                <Text style={styles.priceValue}>{usedPoints.toLocaleString()}P</Text>
                            </View>
                            <View style={styles.totalRow}>
                                <Text style={styles.totalLabel}>최종 결제 금액</Text>
                                <Text style={styles.totalValue}>{finalAmount.toLocaleString()}원</Text>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>결제 수단</Text>
                            <View style={styles.paymentMethodRow}>
                                <TouchableOpacity
                                    style={[
                                        styles.paymentMethodButton,
                                        selectedPaymentMethod === 'pay' && styles.selectedPaymentMethodButton,
                                    ]}
                                    onPress={() => handlePaymentMethodSelect('pay')}
                                >
                                    <Image
                                        style={styles.paymentImage}
                                        source={require('../../../assets/icon/kakao_pay.png')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.paymentMethodButton,
                                        selectedPaymentMethod === 'card' && styles.selectedPaymentMethodButton,
                                    ]}
                                    onPress={() => handlePaymentMethodSelect('card')}
                                >
                                    <Text style={styles.paymentMethodText}>신용/체크카드</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity>
                            <Link
                                href={{
                                    pathname: '(subs)/(shop)/Application', // 이동할 페이지 경로
                                    params: {
                                        amount: finalAmount, // 최종 결제 금액
                                        paymentMethod: selectedPaymentMethod, // 결제 수단
                                        items: JSON.stringify(parsedItems), // 구매한 아이템 데이터
                                    },
                                }}
                                style={styles.checkoutButton}
                            >
                                <Text style={styles.checkoutButtonText}>결제하기</Text>
                            </Link>
                        </TouchableOpacity>
                    </>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: Colors.gray100 
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray200,
        position: 'relative',
    },
    backButton: { position: 'absolute', left: 10 },
    headerTitle: {
        ...Typography.heading.small_bold,
        color: Colors.gray500,
        textAlign: 'center',
    },
    section: {
        backgroundColor: Colors.white,
        padding: 15,
        marginBottom: 10,
        marginHorizontal: 15,
        borderRadius: 5,
    },
    sectionTitle: {
        ...Typography.heading.small_bold,
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.gray200,
        borderRadius: 5,
        marginBottom: 10,
        padding: 15,
        backgroundColor: Colors.white,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    itemName: {
        ...Typography.body.medium_bold,
    },
    itemPrice: {
        ...Typography.body.small,
        color: Colors.gray500,
    },
    itemQuantity: {
        ...Typography.body.medium_bold,
        textAlign: 'right',
    },
    pointContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        position: 'relative',
        marginBottom: 20,
    },
    pointInput: {
        flex: 4,
        borderWidth: 1,
        borderColor: Colors.gray200,
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
        textAlign: 'right',
    },
    applyButton: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.orange100,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    applyButtonText: { 
        color: Colors.white, 
        ...Typography.body.medium 
    },
    boongPoint: {
        position: 'absolute',
        right: 100,
        bottom: -20,
        ...Typography.body.small,
        color: Colors.gray500,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    priceLabel: { 
        ...Typography.body.medium 
    },
    priceValue: { 
        ...Typography.body.medium 
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: Colors.gray200,
        paddingTop: 10,
    },
    totalLabel: { 
        ...Typography.heading.small_bold 
    },
    totalValue: { 
        ...Typography.heading.small_bold 
    },
    paymentMethodRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    paymentMethodButton: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.gray200,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    selectedPaymentMethodButton: { 
        backgroundColor: Colors.orange100 
    },
    paymentMethodText: {
        color: Colors.gray500
    },
    paymentImage: {
        width: 50,
        height: 30,
        resizeMode: 'contain'
    },
    checkoutButton: {
        padding: 15,
        backgroundColor: Colors.orange100,
        alignItems: 'center',
        marginHorizontal: 15,
        borderRadius: 5,
        bottom: 10,
    },
    checkoutButtonText: {
        color: Colors.white,
        ...Typography.body.large_bold,
        textAlign: 'center',
    },
});

export default CheckoutScreen;