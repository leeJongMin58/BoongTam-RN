import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Modal,
    LogBox
} from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../src/styles/color';
import Typography from '../../../src/styles/typhography';
import { STRINGS } from '../../../src/config/string';

LogBox.ignoreLogs([
    'Warning: Postcode: Support for defaultProps will be removed from function components in a future major release'
])

const MIN_ADDRESS_LENGTH = 0;

const AddressInput = () => {
    const [zipcode, setZipcode] = useState('');
    const [address, setAddress] = useState('');
    const [detailedAddress, setDetailedAddress] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const router = useRouter();

    const isNextButtonEnabled = address.length > MIN_ADDRESS_LENGTH && detailedAddress.length > MIN_ADDRESS_LENGTH;
    const isSkipButtonEnabled = address.length === MIN_ADDRESS_LENGTH && detailedAddress.length === MIN_ADDRESS_LENGTH;

    const handleAddressSelect = (data) => {
        setZipcode(data.zonecode);
        setAddress(data.address);
        setModalVisible(false);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                {/* 상단 네비게이션 */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <MaterialIcons name="arrow-back" size={24} color={Colors.gray500} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{STRINGS.SIGNUP.TITLE}</Text>
                    <Text style={styles.pageIndicator}>3 / 3</Text>
                </View>

                {/* 주소 입력 */}
                <View style={styles.addressSection}>
                    <Text style={styles.label}>{STRINGS.SIGNUP.INFO.ADDRESS}</Text>
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
                            <Text style={styles.searchButtonText}>{STRINGS.SIGNUP.INFO.FIND_ADDRESS}</Text>
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
                    <Text style={styles.helperText}>{STRINGS.SIGNUP.INFO.ADDRESS_DISCRIPTION}</Text>
                </View>

                {/* 하단 버튼 */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[
                            styles.nextButton,
                            {
                                backgroundColor:
                                    isNextButtonEnabled || isSkipButtonEnabled
                                        ? Colors.orange100
                                        : Colors.gray200,
                            },
                        ]}
                        disabled={!isNextButtonEnabled && !isSkipButtonEnabled}
                        onPress={() => {
                            if (isNextButtonEnabled) {
                                router.push('/login/signup/loginSuccess'); // 다음 화면으로 이동
                            } else if (isSkipButtonEnabled) {
                                router.push('/login/signup/loginSuccess'); // 건너뛰기 로직 추가
                            }
                        }}
                    >
                        <Text style={styles.nextButtonText}>
                            {isNextButtonEnabled ? '다음' : '건너뛰기'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* 주소 검색 모달 */}
                <Modal visible={isModalVisible} animationType="slide" transparent>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Postcode
                                jsOptions={{ animation: true }}
                                onSelected={handleAddressSelect}
                                onError={(error) => {
                                    console.error('Postcode Error:', error);
                                    Alert.alert('주소 검색 오류', '주소 검색 중 문제가 발생했습니다.');
                                }}
                                style={{ flex: 1 }}
                            />
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>닫기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    header: {
        marginTop: 20,
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        ...Typography.heading.small_bold,
    },
    pageIndicator: {
        ...Typography.heading.small_bold,
        color: Colors.orange100,
    },
    addressSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        ...Typography.body.large_bold,
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        height: 60,
        borderWidth: 1,
        borderColor: Colors.orange100,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        width: '100%',
    },
    zipcodeInput: {
        flex: 3,
        height: 60,
        borderWidth: 1,
        borderColor: Colors.orange100,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '100%',
    },
    searchButton: {
        flex: 1,
        backgroundColor: Colors.orange100,
        paddingVertical: 18,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        height: 60,
    },
    searchButtonText: {
        color: Colors.white,
        ...Typography.body.medium,
    },
    helperText: {
        marginTop: 10,
        ...Typography.body.medium,
        color: Colors.gray300,
        textAlign: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextButton: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: '100%',
    },
    nextButtonText: {
        ...Typography.body.large_bold,
        color: Colors.gray500,
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

export default AddressInput;
