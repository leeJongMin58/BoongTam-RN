import React, { useState } from 'react'
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Alert,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native'
import Colors from '../../../src/styles/color'
import Typography from '../../../src/styles/typhography'
import { STRINGS } from '../../../src/config/string'
import { isDuplicateNickname } from '../../../src/usecases/authUsecase'
import { LoginAppbar } from '../../../src/components/LoginAppbar'

// 상수 정의
const MIN_NICKNAME_LENGTH = 2
const MAX_NICKNAME_LENGTH = 10

const LoginNickname = () => {
	const [nickname, setNickname] = useState('')
	const [isDuplicateChecked, setIsDuplicateChecked] = useState(false)

	const handleNicknameChange = (text) => {
		setNickname(text.trim())
		setIsDuplicateChecked(false)
	}
	const handleDuplicateCheck = () => {
		if (!nickname) {
			Alert.alert('오류', '닉네임을 입력해주세요.')
			return
		}

		// todo api 연결
		// const result = isDuplicateNickname(nickname)
		const result = false

		if (!result) {
			Alert.alert('중복체크 완료!', '사용 가능한 닉네임입니다.')
			setIsDuplicateChecked(true)
		} else {
			Alert.alert(
				'중복체크 실패!',
				'중복된 닉네임입니다. 다른 닉네임을 입력해주세요.',
			)
			setIsDuplicateChecked(false)
		}
	}

	const handleNext = () => {
		Keyboard.dismiss()
	}

	const isNextButtonEnabled = isDuplicateChecked

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.container}
			>
				<LoginAppbar title={STRINGS.LOGIN.TITLE} step="1 / 3" />

				<View style={styles.nicknameSection}>
					<Text style={styles.label}>닉네임</Text>
					<View style={styles.inputRow}>
						<TextInput
							style={styles.input}
							placeholder="닉네임"
							value={nickname}
							onChangeText={handleNicknameChange}
							maxLength={MAX_NICKNAME_LENGTH}
						/>
						<TouchableOpacity
							style={[
								styles.duplicateCheckButton,
								{
									backgroundColor:
										nickname.length >= MIN_NICKNAME_LENGTH
											? Colors.orange100
											: Colors.gray200,
								},
							]}
							onPress={handleDuplicateCheck}
							disabled={nickname.length < MIN_NICKNAME_LENGTH}
						>
							<Text style={styles.duplicateCheckText}>
								중복 체크
							</Text>
						</TouchableOpacity>
					</View>
					<Text style={styles.helperText}>
						닉네임은 이모티콘 제외 {MIN_NICKNAME_LENGTH}~
						{MAX_NICKNAME_LENGTH}글자로 만들어주세요
					</Text>
				</View>

				{/* <LoginBottomBtn 
					pathname='/login/signup/loginEmail'
					signInfo={{nickname}}
					isNextButtonEnabled={isNextButtonEnabled}
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
	},
	
	nicknameSection: {
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
		justifyContent: 'center',
	},
	input: {
		flex: 1,
		height: 60,
		borderWidth: 1,
		borderColor: Colors.orange100,
		borderRadius: 5,
		paddingHorizontal: 10,
		marginRight: 10,
	},
	duplicateCheckButton: {
		paddingVertical: 22,
		paddingHorizontal: 25,
		borderRadius: 5,
	},
	duplicateCheckText: {
		color: Colors.gray500,
	},
	helperText: {
		marginTop: 10,
		...Typography.body.medium,
		color: Colors.gray300,
		textAlign: 'center',
	},
})

export default LoginNickname
