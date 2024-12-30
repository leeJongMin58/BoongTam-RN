import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Alert,
    ScrollView,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../src/styles/color';
import Typography from '../../../src/styles/typhography';
import { STRINGS } from '../../../src/config/string';

const BoongtamOrder = () => {
    const router = useRouter();
    const { orderItems } = useLocalSearchParams();

    const parsedOrderItems = JSON.parse(orderItems || '[]');
    const [items, setItems] = useState(parsedOrderItems);

    useEffect(() => {
        if (orderItems) {
            const updatedItems = JSON.parse(orderItems);
            setItems(updatedItems);
        }
    }, [orderItems]);

    const [selectedTime, setSelectedTime] = useState('지금');
    const [points, setPoints] = useState('');
    const [usedPoints, setUsedPoints] = useState(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const updateQuantity = (id, increment) => {
        const updatedItems = items.map((item) =>
            item.id === id
                ? { ...item, quantity: Math.max(0, item.quantity + increment) }
                : item
        );
        setItems(updatedItems);
    };

    const applyPoints = () => {
        const pointValue = parseInt(points, 10);
        if (isNaN(pointValue) || pointValue % 100 !== 0) {
            Alert.alert('알림', '100p 단위로 입력해주세요.');
            return;
        }
        setUsedPoints(pointValue);
    };

    const orderAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const finalAmount = Math.max(0, orderAmount - usedPoints);

    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
    };

    const handleOrderSubmit = () => {
        if (!selectedPaymentMethod) {
            Alert.alert('알림', '결제 수단을 선택해주세요.');
            return;
        }

        const orderDetails = {
            items,
            totalAmount: finalAmount,
            usedPoints,
            selectedTime,
            paymentMethod: selectedPaymentMethod,
        };

        Alert.alert('주문 완료', '주문이 성공적으로 완료되었습니다.', [
            {
                text: 'OK',
                onPress: () => {
                    router.push({
                        pathname: '/(subs)/(boongtam)/boongtamOrderSuccess',
                        params: {
                            orderItems: JSON.stringify(items),
                            totalAmount: finalAmount,
                            paymentMethod: selectedPaymentMethod
                        }
                    })
                }
            }
        ]

        );
    };

    const handleAddMoreItems = () => {
        router.push({
            pathname: '/(subs)/(boongtam)/boongtamMenuList',
            params: {
                orderItems: JSON.stringify(items),
            },
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.push('/(subs)/(boongtam)/boongtamMenuList')} style={styles.backButton}>
                        <MaterialIcons name="arrow-back" size={24} color={Colors.gray500} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{STRINGS.BOONG_TAM.ORDER.BOONG_TAM_ORDER}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{STRINGS.BOONG_TAM.ORDER.BOONG_TAM_ORDER_PRODUCT}</Text>
                    {items.map((item) => (
                        <View key={item.id} style={styles.itemContainer}>
                            <Image source={{ uri: item.image }} style={styles.itemImage} />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemPrice}>{item.price.toLocaleString()}{STRINGS.BOONG_TAM.PAY.WON}</Text>
                            </View>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity
                                    onPress={() => updateQuantity(item.id, -1)}
                                    style={styles.quantityButton}
                                >
                                    <MaterialIcons name="remove" size={24} color={Colors.orange100} />
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{item.quantity}</Text>
                                <TouchableOpacity
                                    onPress={() => updateQuantity(item.id, 1)}
                                    style={styles.quantityButton}
                                >
                                    <MaterialIcons name="add" size={24} color={Colors.orange100} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>

                <TouchableOpacity onPress={handleAddMoreItems} style={styles.addMoreButton}>
                    <View style={styles.addMoreButtonContent}>
                        <MaterialIcons name='add' size={24} color={Colors.orange100} />
                        <Text style={styles.addMoreButtonText}>{STRINGS.BOONG_TAM.INFO.ADD_MENU}</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{STRINGS.BOONG_TAM.INFO.PICKUP}</Text>
                    <View style={styles.timeContainer}>
                        {['지금', '+5분', '+10분', '+15분', '+20분', '+30분', '+40분', '1시간 이상'].map((time) => (
                            <TouchableOpacity
                                key={time}
                                onPress={() => setSelectedTime(time)}
                                style={[
                                    styles.timeButton,
                                    selectedTime === time && styles.selectedTimeButton,
                                ]}
                            >
                                <Text style={styles.timeButtonText}>{time}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{STRINGS.BOONG_TAM.INFO.POINT}</Text>
                    <View style={styles.pointContainer}>
                        <TextInput
                            style={styles.pointInput}
                            placeholder="100P 단위로 사용 가능"
                            keyboardType="numeric"
                            value={points}
                            onChangeText={setPoints}
                        />
                        <TouchableOpacity onPress={applyPoints} style={styles.applyButton}>
                            <Text style={styles.applyButtonText}>{STRINGS.BOONG_TAM.INFO.APPLICATION}</Text>
                        </TouchableOpacity>
                        <Text style={styles.boongPoint}>{STRINGS.BOONG_TAM.INFO.BOONG_POINT}: {usedPoints}P</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{STRINGS.BOONG_TAM.PAY.PAYMENT_AMOUNT}</Text>
                    <View style={styles.row}>
                        <Text style={styles.labelText}>{STRINGS.BOONG_TAM.PAY.ORDER_AMOUNT}</Text>
                        <Text style={styles.valueText}>{orderAmount.toLocaleString()}원</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelText}>{STRINGS.BOONG_TAM.PAY.USE_POINT}</Text>
                        <Text style={styles.valueText}>{usedPoints}P</Text>
                    </View>
                    <View style={[styles.row, styles.finalAmountRow]}>
                        <Text style={styles.finalLabelText}>{STRINGS.BOONG_TAM.PAY.FINAL_AMOUNT}</Text>
                        <Text style={styles.finalValueText}>{finalAmount.toLocaleString()}{STRINGS.BOONG_TAM.PAY.WON}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{STRINGS.BOONG_TAM.PAY.PAYMENT_METHOD}</Text>
                    <View style={styles.paymentMethodContainer}>
                        <TouchableOpacity
                            style={[
                                styles.paymentMethodButton,
                                selectedPaymentMethod === 'pay' && styles.selectedPaymentMethodButton,
                            ]}
                            onPress={() => handlePaymentMethodSelect('pay')}
                        >
                            <Image
                                style={styles.kakaoLogo}
                                source={require('../../../assets/icon/kakao_pay.png')}
                                resizeMode='contain'
                            ></Image>
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

                <TouchableOpacity onPress={handleOrderSubmit} style={styles.orderButton}>
                    <Text style={styles.orderButtonText}>{STRINGS.BOONG_TAM.ORDER.BOONG_TAM_ORDER}</Text>
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
        textAlign: 'center'
    },
    section: {
        backgroundColor: Colors.white,
        padding: 15,
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    sectionTitle: { ...Typography.heading.small_bold, marginBottom: 10 },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    labelText: {
        ...Typography.body.medium,
        color: Colors.gray500,
    },
    valueText: {
        ...Typography.body.medium_bold,
        color: Colors.gray900,
    },
    finalAmountRow: {
        marginTop: 10, // 위 텍스트와 간격 추가
        paddingTop: 10, // 내부 여백 추가
        borderTopWidth: 1,
        borderTopColor: Colors.gray200,
    },
    finalLabelText: {
        ...Typography.body.large_bold,
        color: Colors.gray500,
    },
    finalValueText: {
        ...Typography.body.large_bold,
        color: Colors.gray500,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
        backgroundColor: Colors.white,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.gray200,
    },
    itemImage: {
        width: 80,
        height: 50,
        borderRadius: 10,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        ...Typography.body.medium_bold,
        marginBottom: 5,
    },
    itemPrice: {
        ...Typography.body.small,
        color: Colors.gray500,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        padding: 5,
        borderWidth: 1,
        borderColor: Colors.orange100,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    quantityText: {
        ...Typography.body.large_bold,
        marginLeft: 5,
        marginRight: 5

    },
    addMoreButton: {
        borderWidth: 1,
        borderColor: Colors.orange100,
        backgroundColor: Colors.white,
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 15,
        marginHorizontal: 15,
    },
    addMoreButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addMoreButtonText: { color: Colors.orange100, ...Typography.body.large_bold, marginLeft: 5 },
    timeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    timeButton: {
        width: '23%',
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: Colors.gray200,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedTimeButton: { backgroundColor: Colors.orange100 },
    timeButtonText: { ...Typography.body.medium, color: Colors.gray500 },
    pointContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        position: 'relative',
        marginBottom: 20
    },
    pointInput: {
        flex: 4,
        borderWidth: 1,
        borderColor: Colors.gray200,
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
        paddingVertical: 15,
        textAlign: 'right'
    },
    applyButton: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.orange100,
        borderRadius: 5,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    applyButtonText: { color: Colors.white, ...Typography.body.medium },
    boongPoint: {
        position: 'absolute',
        right: 100, // 오른쪽 여백
        bottom: -20, // 아래쪽 여백 (포인트 입력창 기준)
        ...Typography.body.small, // 텍스트 스타일
        color: Colors.gray500,
    },
    paymentMethodContainer: { flexDirection: 'row', marginTop: 10 },
    paymentMethodButton: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.gray200,
        alignItems: 'center',
        marginHorizontal: 5,
        borderRadius: 5,
        textAlign: 'center',
        justifyContent: 'center',
        height: 70
    },
    selectedPaymentMethodButton: {
        backgroundColor: Colors.orange100,
        height: 70,
    },
    paymentMethodText: { color: Colors.gray500 },
    orderButton: {
        padding: 15,
        backgroundColor: Colors.orange100,
        alignItems: 'center',
        marginHorizontal: 15,
        borderRadius: 5,
    },
    orderButtonText: { color: Colors.white, ...Typography.body.large_bold },
    kakaoLogo: {
        width: '80%',
        height: '80%'
    }
});

export default BoongtamOrder;
