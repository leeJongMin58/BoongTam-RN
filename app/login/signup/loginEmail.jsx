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
  Keyboard
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../src/styles/color';
import Typography from '../../../src/styles/typhography';
import { STRINGS } from '../../../src/config/string';
import Container from '../../../src/components/container';

// 상수 정의
const MIN_EMAIL_LENGTH = 0;

// 이메일 유효성 검사 정규식
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginEmail = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleEmailChange = (text) => {
    setEmail(text.trim()); // 공백 제거
  };

  const isNextButtonEnabled = EMAIL_REGEX.test(email); // 이메일 양식 검사

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        {/* 상단 네비게이션 */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color={Colors.gray500} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{STRINGS.SIGNUP.TITLE}</Text>
          <Text style={styles.pageIndicator}>2 / 3</Text>
        </View>

        {/* 이메일 입력 */}
        <View style={styles.emailSection}>
          <Text style={styles.label}>이메일</Text>
          <TextInput
            style={styles.input}
            placeholder="이메일"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
          />
          <Text style={styles.helperText}>이메일 양식에 맞춰 작성해주세요.</Text>
        </View>

        {/* 하단 버튼 */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              {
                backgroundColor:
                  email.length === MIN_EMAIL_LENGTH || isNextButtonEnabled
                    ? Colors.orange100
                    : Colors.gray200,
              },
            ]}
            disabled={email.length > MIN_EMAIL_LENGTH && !isNextButtonEnabled}
            onPress={() => {
              if (isNextButtonEnabled || email.length === MIN_EMAIL_LENGTH) {
                router.push('/login/signup/loginAddress');
              }
            }}
          >
            <Text style={styles.nextButtonText}>
              {email.length === MIN_EMAIL_LENGTH
                ? '건너뛰기'
                : isNextButtonEnabled
                  ? '다음'
                  : '건너뛰기'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between'
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
  emailSection: {
    flex: 1,
    justifyContent: 'center', // 수직 위치 조정
    alignItems: 'center',         // 수평 위치 중앙
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
    marginRight: 10,
    width: '100%',
  },
  helperText: {
    marginTop: 10,
    ...Typography.body.medium,
    color: Colors.gray300,
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

export default LoginEmail;
