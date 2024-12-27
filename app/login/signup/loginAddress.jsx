import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../src/styles/color';
import Typography from '../../../src/styles/typhography';
import { STRINGS } from '../../../src/config/string';
import Container from '../../../src/components/container';

const MIN_ADDRESS_LENGTH = 0;

const AddressInput = () => {
    const [address, setAddress] = useState('');
    const [detailedAddress, setDetailedAddress] = useState('');
    const router = useRouter();

    const isNextButtonEnabled = address.length > MIN_ADDRESS_LENGTH && detailedAddress.length > MIN_ADDRESS_LENGTH;
    const isSkipButtonEnabled = address.length === MIN_ADDRESS_LENGTH && detailedAddress.length === MIN_ADDRESS_LENGTH;

    return (
        <Container>
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
                <Text style={styles.label}>주소</Text>
                <TextInput
                    style={styles.input}
                    placeholder="주소"
                    value={address}
                    onChangeText={(text) => setAddress(text.trim())}
                />
                <TextInput
                    style={styles.input}
                    placeholder="상세주소"
                    value={detailedAddress}
                    onChangeText={(text) => setDetailedAddress(text.trim())}
                />
                <Text style={styles.helperText}>주소에 이모티콘은 사용할 수 없습니다.</Text>
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
                            router.push('/login/signup/loginSuccess'); // 다음 화면으로 이동 제작 후 수정(메인화면)
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
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
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
        justifyContent: 'flex-start', // 위치 조정 가능
        alignItems: 'center',
        marginTop: 300,
    },
    label: {
        ...Typography.body.large_bold,
        marginBottom: 8,
        alignSelf: 'flex-start',
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
});

export default AddressInput;
