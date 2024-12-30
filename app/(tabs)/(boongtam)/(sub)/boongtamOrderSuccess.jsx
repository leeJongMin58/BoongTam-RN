import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    FlatList,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../../src/styles/color';
import Typography from '../../../../src/styles/typhography';

const BoongtamOrderSuccess = () => {
    const router = useRouter();
    const { orderItems, totalAmount, paymentMethod } = useLocalSearchParams();

    const parsedOrderItems = JSON.parse(orderItems || '[]');
    const parsedTotalAmount = parseInt(totalAmount, 10);

    const handleCancelOrder = () => {
        Alert.alert(
            '주문 취소',
            '정말 주문을 취소하시겠습니까?',
            [
                { text: '아니요', style: 'cancel' },
                { text: '예', onPress: () => router.push('/boongtamDetail') },
            ],
            { cancelable: true }
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={parsedOrderItems}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    <>
                        {/* Header */}
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => router.push('/boongtamDetail')} style={styles.backButton}>
                                <MaterialIcons name="arrow-back" size={24} color={Colors.gray500} />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>붕탐 오더 주문현황</Text>
                        </View>

                        {/* 주문 현황 */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>주문 현황 보기</Text>
                            <View style={styles.statusContainer}>
                                <Text style={styles.statusText}>주문 접수 확인</Text>
                                <Text style={styles.statusSubText}>가게에서 주문을 확인 중 이에요!</Text>
                            </View>
                        </View>


                    </>
                }

                ListFooterComponent={
                    <>
                        {/* 주문 상품 정보 */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>주문 상품 정보</Text>
                            {parsedOrderItems.map((item) => (
                                <View key={item.id} style={styles.itemContainer}>
                                    {/* 상품 이미지 */}
                                    <Image source={{ uri: item.image }} style={styles.itemImage} />

                                    {/* 상품 정보 */}
                                    <View style={styles.itemDetails}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <Text style={styles.itemPrice}>{item.price.toLocaleString()}원</Text>
                                    </View>

                                    {/* 상품 수량 */}
                                    <Text style={styles.itemQuantity}>{item.quantity}개</Text>
                                </View>
                            ))}
                        </View>
                        {/* 남은 시간 */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>이만큼 남았어요~</Text>
                            <View style={styles.timeContainer}>
                                <Text style={styles.timeText}>50분 뒤에 완성 예정이에요!</Text>
                            </View>
                        </View>

                        {/* 결제 정보 */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>총 주문 금액</Text>
                            <View style={styles.priceRow}>
                                <Text style={styles.priceLabel}>주문 금액</Text>
                                <Text style={styles.priceValue}>{parsedTotalAmount.toLocaleString()}원</Text>
                            </View>
                            <View style={styles.priceRow}>
                                <Text style={styles.priceLabel}>포인트 사용</Text>
                                <Text style={styles.priceValue}>0P</Text>
                            </View>
                            <View style={styles.totalRow}>
                                <Text style={styles.totalLabel}>최종 결제 금액</Text>
                                <Text style={styles.totalValue}>{parsedTotalAmount.toLocaleString()}원</Text>
                            </View>
                            <View style={styles.paymentMethodRow}>
                                <Text style={styles.priceLabel}>결제 방법</Text>
                                <Text style={styles.priceValue}>
                                    {paymentMethod === 'pay' ? 'Pay' : '신용/체크카드'}
                                </Text>
                            </View>
                        </View>

                        {/* 주문 취소 버튼 */}
                        <TouchableOpacity onPress={handleCancelOrder} style={styles.cancelButton}>
                            <Text style={styles.cancelButtonText}>주문 취소 하기</Text>
                        </TouchableOpacity>
                    </>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.gray100 },
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
    statusContainer: {
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.orange100,
        borderRadius: 5,
        backgroundColor: Colors.white,
    },
    statusText: { ...Typography.heading.small, color: Colors.orange100 },
    statusSubText: { ...Typography.body.medium, color: Colors.gray500, marginTop: 5 },
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
    timeContainer: {
        alignItems: 'center',
        height: 60,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.orange100,
        borderRadius: 5,
        justifyContent: 'center'
    },
    timeText: { ...Typography.body.medium_bold, color: Colors.orange100 },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    priceLabel: { ...Typography.body.medium },
    priceValue: { ...Typography.body.medium },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: Colors.gray200,
        paddingTop: 10,
    },
    totalLabel: { ...Typography.heading.small_bold },
    totalValue: { ...Typography.heading.small_bold },
    paymentMethodRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    cancelButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: Colors.orange100,
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 15,
        marginBottom: 20
    },
    cancelButtonText: { color: Colors.white, ...Typography.body.large_bold },
});

export default BoongtamOrderSuccess;
