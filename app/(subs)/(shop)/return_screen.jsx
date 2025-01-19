import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    Modal,
    FlatList,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, Link, useRouter } from 'expo-router';
import colors from '../../../src/styles/color';
import typography from '../../../src/styles/typhography';
import { STRINGS } from '../../../src/config/string';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Postcode from '@actbase/react-daum-postcode'; // Daum Postcode 컴포넌트

export default function BongTemShopReturn() {
    const { items } = useLocalSearchParams();
    const router = useRouter();
    const scrollViewRef = useRef(null);

    const parsedItems = items ? JSON.parse(items) : [];

    const [reason, setReason] = useState(''); // 반품 사유
    const [selectedOption, setSelectedOption] = useState(''); // 반품 방법 선택
    const [address, setAddress] = useState(STRINGS.SHOP.RETURN_SCREEN.RETURN_NOW_ADDRESS); // 현재 주소
    const [zipcode, setZipcode] = useState(''); // 우편번호
    const [detailedAddress, setDetailedAddress] = useState(''); // 상세 주소
    const [shippingFee, setShippingFee] = useState(5000); // 배송비
    const [modalVisible, setModalVisible] = useState(false); // 반품 사유 선택 모달
    const [addressModalVisible, setAddressModalVisible] = useState(false); // 주소 검색 모달

    const reasons = [
        STRINGS.SHOP.RETURN_SCREEN.RETURN_NOW_REASON.REASON1,
        STRINGS.SHOP.RETURN_SCREEN.RETURN_NOW_REASON.REASON2,
        STRINGS.SHOP.RETURN_SCREEN.RETURN_NOW_REASON.REASON3,
        STRINGS.SHOP.RETURN_SCREEN.RETURN_NOW_REASON.REASON4,
        STRINGS.SHOP.RETURN_SCREEN.RETURN_NOW_REASON.REASON5,
    ];

    const handleReasonSelect = (selectedReason) => {
        setReason(selectedReason);
        setModalVisible(false);
    };

    const handleAddressSelect = (data) => {
        setZipcode(data.zonecode);
        setAddress(data.address);
        setAddressModalVisible(false);
    };

    const handleSubmit = () => {
        if (!zipcode || !address || !detailedAddress) {
            Alert.alert('경고', '모든 주소 정보를 입력해주세요.');
            return;
        }
        if (!reason) {
            Alert.alert('경고', '교환 사유를 선택해주세요.');
            return;
        }
        if (!selectedOption) {
            Alert.alert('경고', '회수 방법을 선택해주세요.');
            return;
        }
        router.push({
            pathname: '(subs)/(shop)/return_complete',
            params: {
                items: JSON.stringify(parsedItems),
                reason,
                selectedOption,
                zipcode,
                address,
                detailedAddress,
            },
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView ref={scrollViewRef}>
                {/* 상단 네비게이션 */}
                <View style={styles.header}>
                    <Link href="(subs)/(shop)/Application" style={styles.backbutton}>
                        <MaterialIcons name="arrow-back" size={24} color={colors.gray500} />
                    </Link>

                    <Link href="(subs)/(my)/my_setting" style={styles.settingsButton}>
                        <MaterialIcons name="settings" size={24} color={colors.gray500} />
                    </Link>
                </View>

                {/* 선택된 상품 목록 */}
                {parsedItems.map((item, index) => (
                    <View key={index} style={styles.card}>
                        <Image source={item.image} style={styles.productImage} />
                        <View style={styles.cardDetails}>
                            <TouchableOpacity>
                                <Text style={styles.orderDetailsText}>{STRINGS.SHOP.RETURN_SCREEN.RETURN_ORDER_VIEW}</Text>
                            </TouchableOpacity>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.productPrice}>{item.price.toLocaleString()}</Text>
                            <Text>{STRINGS.SHOP.RETURN_SCREEN.RETURN_COUNT.COUNT}: {item.quantity}{STRINGS.SHOP.RETURN_SCREEN.RETURN_COUNT.TYPE}</Text>
                        </View>
                    </View>
                ))}

                {/* 반품 사유 */}
                <View style={styles.formSection}>
                    <Text style={styles.formLabel}>{STRINGS.SHOP.RETURN_SCREEN.RETURN_CHANGE_WHY}</Text>
                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={{ color: reason ? '#000' : '#aaa' }}>
                            {reason || STRINGS.SHOP.RETURN_SCREEN.RETURN_CHANGE_WHY_TEXT}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* 반품 방법 선택 */}
                <View style={styles.formSection}>
                    <Text style={styles.formLabel}>{STRINGS.SHOP.RETURN_SCREEN.SUTTLE_METHOD_TEXT}</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedOption}
                            onValueChange={(itemValue) => setSelectedOption(itemValue)}
                        >
                            <Picker.Item label={STRINGS.SHOP.RETURN_SCREEN.SUTTLE_CHOOSE.CHOOSE1} value="direct" />
                            <Picker.Item label={STRINGS.SHOP.RETURN_SCREEN.SUTTLE_CHOOSE.CHOOSE2} value="pickup" />
                        </Picker>
                    </View>
                </View>

                {/* 현재 주소 */}
                <View style={styles.formSection}>
                    <Text style={styles.formLabel}>{STRINGS.SHOP.RETURN_SCREEN.NOW_ADDRESS}</Text>
                    <View style={styles.addressContainer}>
                        <TextInput
                            style={styles.input}
                            value={zipcode}
                            placeholder="우편번호"
                            editable={false}
                        />
                        <TextInput
                            style={styles.input}
                            value={address}
                            placeholder="주소"
                            editable={false}
                        />
                        <TextInput
                            style={styles.input}
                            value={detailedAddress}
                            placeholder="상세 주소"
                            onChangeText={setDetailedAddress}
                        />
                        <TouchableOpacity
                            style={styles.changeButton}
                            onPress={() => setAddressModalVisible(true)}
                        >
                            <Text style={styles.changeButtonText}>{STRINGS.SHOP.CHANGE_SCREEN.NOW_ADDRESS_CHANGE}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                {/* 반품 요약 */}
                <View style={styles.summary}>
                    <Text style={styles.summaryText}>{STRINGS.SHOP.RETURN_SCREEN.SUTTLE_INFO.FEE_TITLE}</Text>
                    <Text style={styles.summaryText}>{shippingFee.toLocaleString()}원</Text>
                    <Text style={styles.summaryText}>{STRINGS.SHOP.RETURN_SCREEN.SUTTLE_INFO.FEE_RETURN}</Text>
                    <Text style={styles.summaryText}>{STRINGS.SHOP.RETURN_SCREEN.SUTTLE_INFO.FEE_COMPANY}</Text>
                </View>

                {/* 버튼 */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.actionButton}
                    >
                        <Text style={styles.actionButtonText}>{STRINGS.SHOP.RETURN_SCREEN.RETURN_APPLY}</Text>
                    </TouchableOpacity>
                </View>

                {/* 반품 사유 모달 */}
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>{STRINGS.SHOP.RETURN_SCREEN.RETURN_CHOOSE}</Text>
                            <FlatList
                                data={reasons}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.modalItem}
                                        onPress={() => handleReasonSelect(item)}
                                    >
                                        <Text style={styles.modalItemText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                            <TouchableOpacity
                                style={styles.modalCloseButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalCloseButtonText}>{STRINGS.SHOP.RETURN_SCREEN.CLOSE}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                 {/* 주소 검색 모달 */}
                 <Modal
                    visible={addressModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setAddressModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Postcode
                                style={{ width: '100%', height: 400 }}
                                jsOptions={{ animated: true }}
                                onSelected={handleAddressSelect}
                            />
                            <TouchableOpacity
                                style={styles.modalCloseButton}
                                onPress={() => setAddressModalVisible(false)}
                            >
                                <Text style={styles.modalCloseButtonText}>{STRINGS.SHOP.CHANGE_SCREEN.CLOSE}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray100,
    },
    header: {
        height: 50,
        backgroundColor: colors.orange100,
        alignItems: "center",
        justifyContent: "center",
    },
    backbutton: {
        position: "absolute",
        left: 10,
    },
    settingsButton: {
        position: "absolute",
        right: 10,
    },
    backButtonText: {
        ...typography.body.large,
        color: colors.gray500,
    },
    headerText: {
        ...typography.heading.medium,
        color: colors.gray500,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: 8,
        margin: 8,
        padding: 8,
        alignItems: 'center',
    },
    productImage: {
        width: '30%',
        aspectRatio: 1,
        borderRadius: 8,
        backgroundColor: colors.gray200,
    },
    cardDetails: {
        flex: 1,
        marginLeft: 8,
        justifyContent: 'space-between',
    },
    orderDetailsText: {
        ...typography.body.medium,
        color: colors.blue100,
        textAlign: 'right',
        marginBottom: 8,
    },
    productName: {
        ...typography.body.large_bold,
        color: colors.gray500,
        marginBottom: 4,
    },
    productPrice: {
        ...typography.body.medium,
        color: colors.red100,
        fontWeight: 'bold',
    },
    quantityText: {
        ...typography.body.medium,
        color: colors.gray400,
    },
    formSection: {
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    formLabel: {
        ...typography.label.large,
        color: colors.gray400,
        marginBottom: 8,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.gray300,
        borderRadius: 8,
        padding: 12,
        backgroundColor: colors.white,
        marginBottom: 10,
    },
    changeButton: {
        backgroundColor: colors.orange300,
        paddingVertical: 13,
        paddingHorizontal: 13,
        borderRadius: 8,
    },
    changeButtonText: {
        ...typography.body.large_bold,
        color: colors.white,
        textAlign: 'center',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: colors.gray300,
        borderRadius: 8,
        backgroundColor: colors.white,
    },
    summary: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: colors.gray200,
        borderRadius: 8,
        marginHorizontal: 16,
    },
    summaryText: {
        ...typography.body.medium,
        color: colors.gray500,
        marginBottom: 4,
    },
    buttonContainer: {
        alignItems: 'center',
        padding: 16,
    },
    actionButton: {
        backgroundColor: colors.orange300,
        paddingVertical: 12,
        paddingHorizontal: 120,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonText: {
        ...typography.body.large_bold,
        color: colors.white,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: colors.white,
        width: '80%',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    modalTitle: {
        ...typography.heading.small,
        color: colors.gray500,
        marginBottom: 16,
    },
    modalItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray300,
        width: '100%',
    },
    modalItemText: {
        ...typography.body.medium,
        textAlign: 'center',
        color: colors.gray400,
    },
    modalCloseButton: {
        marginTop: 16,
        backgroundColor: colors.orange300,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    modalCloseButtonText: {
        ...typography.body.large_bold,
        color: colors.white,
    },
});
