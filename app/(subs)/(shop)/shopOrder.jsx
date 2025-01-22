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
    Modal,
    LogBox
} from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../src/styles/color';
import Typography from '../../../src/styles/typhography';
import { STRINGS } from '../../../src/config/string';

LogBox.ignoreLogs([
    'Warning: Postcode: Support for defaultProps will be removed from function components in a future major release'
])

const shopOrder = () => {
    const router = useRouter();
    const { selectedItems } = useLocalSearchParams();

    const parsedItems = selectedItems ? JSON.parse(selectedItems) : [];
    const [points, setPoints] = useState('');
    const [usedPoints, setUsedPoints] = useState(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [zipcode, setZipcode] = useState('');
    const [address, setAddress] = useState('');
    const [detailedAddress, setDetailedAddress] = useState('');

    const calculateTotalAmount = () => {
        return parsedItems.reduce((total, item) => {
            const price = parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0;
            const quantity = item.quantity || 0;
            return total + price * quantity;
        }, 0);
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
        if (!zipcode || !address || !detailedAddress) {
            Alert.alert('경고', '배송지 정보를 모두 입력해주세요.');
            return;
        }

        if (!selectedPaymentMethod) {
            Alert.alert('경고', '결제 수단을 선택해주세요.');
            return;
        }

        const orderDate = new Date().toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });

        Alert.alert(
            '결제 완료',
            '결제가 성공적으로 완료되었습니다.',
            [
                {
                    text: '확인',
                    onPress: () => {
                        router.push({
                            pathname: '/shopOrderSuccess',
                            params: {
                                orderItems: JSON.stringify(parsedItems),
                                usedPoints,
                                totalAmount: calculateTotalAmount(),
                                paymentMethod: selectedPaymentMethod,
                                orderDate,
                                deliveryAddress: `${address} ${detailedAddress}`,
                            },
                        });
                    },
                },
            ]
        );
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
                            <Text style={styles.headerTitle}>{STRINGS.BOONG_TAM.ORDER.ORDER}</Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{STRINGS.BOONG_TAM.ORDER.BOONG_TAM_ORDER_PRODUCT}</Text>
                            {parsedItems.map((item) => (
                                <View key={item.id.toString()} style={styles.itemContainer}>
                                    <Image source={item.image} style={styles.itemImage} />
                                    <View style={styles.itemDetails}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <Text style={styles.itemPrice}>{item.price.toLocaleString()}원</Text>
                                    </View>
                                    <Text style={styles.itemQuantity}>{item.quantity}개</Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{STRINGS.BOONG_TAM.ORDER.ADDRESS_PRODUCT}</Text>
                            <View style={styles.inputRow}>
                                <TextInput
                                    style={styles.zipcodeInput}
                                    placeholder="우편번호"
                                    value={zipcode}
                                    editable={false}
                                />
                                <TouchableOpacity
                                    style={styles.searchButton}
                                    onPress={() => setModalVisible(true)}
                                >
                                    <Text style={styles.searchButtonText}>주소찾기</Text>
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="주소"
                                value={address}
                                editable={false}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="상세주소"
                                value={detailedAddress}
                                onChangeText={(text) => setDetailedAddress(text.trim())}
                            />
                        </View>
                    </>
                }
                ListFooterComponent={
                    <>
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
                            <Text style={styles.sectionTitle}>{STRINGS.BOONG_TAM.PAY.TOTAL_PAYMENT}</Text>
                            <View style={styles.priceRow}>
                                <Text style={styles.priceLabel}>{STRINGS.BOONG_TAM.PAY.ORDER_AMOUNT}</Text>
                                <Text style={styles.priceValue}>{calculateTotalAmount().toLocaleString()}{STRINGS.BOONG_TAM.PAY.WON}</Text>
                            </View>
                            <View style={styles.priceRow}>
                                <Text style={styles.priceLabel}>{STRINGS.BOONG_TAM.PAY.USE_POINT}</Text>
                                <Text style={styles.priceValue}>{usedPoints.toLocaleString()}P</Text>
                            </View>
                            <View style={styles.totalRow}>
                                <Text style={styles.totalLabel}>{STRINGS.BOONG_TAM.PAY.FINAL_AMOUNT}</Text>
                                <Text style={styles.totalValue}>{finalAmount.toLocaleString()}{STRINGS.BOONG_TAM.PAY.WON}</Text>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{STRINGS.BOONG_TAM.PAY.PAYMENT_METHOD}</Text>
                            <View style={styles.paymentMethodRow}>
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

                        <TouchableOpacity onPress={handleCheckout} style={styles.checkoutButton}>
                            <Text style={styles.checkoutButtonText}>{STRINGS.BOONG_TAM.PAY.PAY}</Text>
                        </TouchableOpacity>
                    </>
                }
            />

            <Modal visible={isModalVisible} animationType="slide" transparent>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Postcode
                            jsOptions={{ animation: true }}
                            onSelected={(data) => {
                                setZipcode(data.zonecode);
                                setAddress(data.address);
                                setModalVisible(false);
                            }}
                            onError={(error) => {
                                console.error('Postcode Error:', error);
                                Alert.alert('주소 검색 오류', '주소 검색 중 문제가 발생했습니다.');
                            }}
                            style={{ flex: 1 }}
                        />
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        height: 50
    },
    applyButton: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.orange100,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
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
        marginHorizontal: 5,
        borderRadius: 5,
        textAlign: 'center',
        justifyContent: 'center',
        height: 70
    },
    selectedPaymentMethodButton: {
        backgroundColor: Colors.orange100
    },
    paymentMethodText: {
        color: Colors.gray500
    },
    kakaoLogo: {
        width: '80%',
        height: '80%',
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
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        height: 60,
        borderWidth: 1,
        borderColor: Colors.gray200,
        borderRadius: 5,
        paddingHorizontal: 10,
        flex: 1,
        marginBottom: 10
    },
    zipcodeInput: {
        flex: 3,
        height: 60,
        borderWidth: 1,
        borderColor: Colors.gray200,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    searchButton: {
        flex: 1,
        backgroundColor: Colors.orange100,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        height: 60
    },
    searchButtonText: {
        color: Colors.white,
        ...Typography.body.medium,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        height: '70%',
        backgroundColor: Colors.white,
        borderRadius: 10,
        overflow: 'hidden',
    },
    closeButton: {
        backgroundColor: Colors.orange100,
        padding: 15,
        alignItems: 'center',
    },
    closeButtonText: {
        color: Colors.white,
        ...Typography.body.medium,
    },
});

export default shopOrder;
