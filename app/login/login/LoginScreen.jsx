import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	View,
	TouchableWithoutFeedback,
} from 'react-native'
import { LoginAppbar } from '../../../src/components/LoginAppbar'
import { STRINGS } from '../../../src/config/string'
import { useState } from 'react'
import { LoginForm } from '../../../src/components/LoginForm'
import { LoginLongBtn } from '../../../src/components/LoginLongBtn'
import { LoginFindBtn } from '../../../src/components/LoginFindBtn'
import { AgreementModal } from './AgreementModal'
import { router } from 'expo-router'

export default function LoginScreen() {
	const [id, setId] = useState('')
	const [password, setPassword] = useState('')
	const [warning, setWarning] = useState('')
	const [isModalVisible, setModalVisible] = useState(false)

	const openModal = () => {
		setModalVisible(true)
	}

	const closeModal = () => {
		setModalVisible(false)
	}

	const moveToBoongTam = () => {
		router.navigate('/boongtam')
	}

	const moveToSignup = () => {
		router.navigate('/login/signup/LoginAuthScreen')
	}

	const handleWarningMsg = () => {
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.container}
			>
				{/* 상단 네비게이션 */}
				<LoginAppbar title={STRINGS.LOGIN.LOGIN} />

				{/* 로그인 입력 폼 */}
				<LoginForm
					warning_msg={warning}
					id_value={id}
					onChangeId={setId}
					pw_value={password}
					onChangePw={setPassword}
				/>

				{/* 로그인, 회원가입, 아이디/패스워드 찾기 버튼 */}
				<View style={styles.buttonList}>
					<LoginLongBtn text={STRINGS.LOGIN.LOGIN} onPress={moveToBoongTam}/>
					<LoginLongBtn text={STRINGS.LOGIN.SIGNUP} onPress={openModal} />
					<LoginFindBtn text={STRINGS.LOGIN.INPUT.FIND_ID} />
					<LoginFindBtn text={STRINGS.LOGIN.INPUT.FIND_PW} />
				</View>

				<AgreementModal
					isVisible={isModalVisible}
					onClose={closeModal}
					onAgreement={moveToSignup}
				/>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
	},
	buttonList: {
		marginTop: 40,
	},
})
