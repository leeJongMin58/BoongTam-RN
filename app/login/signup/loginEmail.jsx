import React, { useState } from 'react'
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import Colors from '../../../src/styles/color'
import Typography from '../../../src/styles/typhography'
import { STRINGS } from '../../../src/config/string'
import { LoginAppbar } from '../../../src/components/LoginAppbar'

// 상수 정의
const MIN_EMAIL_LENGTH = 0

// 이메일 유효성 검사 정규식
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LoginEmailScreen = () => {
	const [email, setEmail] = useState('')
	const { signInfo } = useLocalSearchParams()
	const nickname = (signInfo ? JSON.parse(signInfo) : null)?.nickname

	const handleEmailChange = (text) => {
		setEmail(text.trim())
	}

	const handleNext = () => {
		Keyboard.dismiss()
		if (EMAIL_REGEX.test(email) || email.length === MIN_EMAIL_LENGTH) {
			router.push('/login/signup/loginAddress')
		}
	}

	const isNextButtonEnabled = EMAIL_REGEX.test(email)

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.container}
			>
				{/* 상단 네비게이션 */}
				<LoginAppbar title={STRINGS.LOGIN.TITLE} step="2 / 3" />

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
					<Text style={styles.helperText}>
						이메일 양식에 맞춰 작성해주세요.
					</Text>
				</View>

				{/* 하단 버튼 */}
				{/* <LoginBottomBtn
					pathname="/login/signup/loginAddress"
					signInfo={{ nickname, email }}
					isNextButtonEnabled={true}
					handleNext={() => handleNext()}
				/> */}
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'space-between',
	},
	emailSection: {
		flex: 1,
		justifyContent: 'center', // 수직 위치 조정
		alignItems: 'center', // 수평 위치 중앙
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
})

export default LoginEmail
