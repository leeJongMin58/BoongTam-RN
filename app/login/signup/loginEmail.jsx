import { useState, useEffect, useRef } from 'react'
import {
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { STRINGS } from '../../../src/config/string'
import { LoginAppbar } from '../../../src/components/LoginAppbar'
import LoginEmailForm from '../../../src/components/LoginEmailForm'
import { LoginLongBtn } from '../../../src/components/LoginLongBtn'
import { signupUseCase } from '../../../src/usecases/authUsecase'

const LoginEmailScreen = () => {
	const local = useLocalSearchParams()
	const router = useRouter()

	const emailStates = {
		GOOD: 'good',
		FAIL_REQUIREMENT: 'fail_requirement',
		NO_EMAIL: 'no_email',
	}

	const [email, setEmail] = useState('')
	const [emailState, setEmailState] = useState(emailStates.NO_EMAIL)
	const [buttonText, setButtonText] = useState(STRINGS.LOGIN.NEXT)

	const finallyEmail = useRef(null)

	useEffect(() => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (regex.test(email)) {
			setEmailState(emailStates.GOOD)
			setButtonText(STRINGS.LOGIN.NEXT)
			finallyEmail.current = email
		} else {
			setEmailState(emailStates.FAIL_REQUIREMENT)
			setButtonText(STRINGS.LOGIN.PASS)
			finallyEmail.current = null
		}
	})

	const handleNextBtn = async () => {
		Keyboard.dismiss()
		router.push({
			pathname: '/login/signup/loginAddress',
			params: {
				id: local.id,
				phoneNumber: local.phoneNumber,
				password: local.password,
				email: finallyEmail.current,
			},
		})
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.container}
			>
				{/* 상단 네비게이션 */}
				<LoginAppbar
					title={STRINGS.LOGIN.EMAIl.EMAIL}
					step={STRINGS.LOGIN.EMAIl.STEP}
				/>

				<LoginEmailForm email={email} onChangeEmail={setEmail} />

				<LoginLongBtn text={buttonText} onPress={handleNextBtn} />
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
})

export default LoginEmailScreen
