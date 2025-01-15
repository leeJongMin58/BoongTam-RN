import {
	Keyboard,
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
} from 'react-native'
import { LoginAppbar } from '../../../src/components/LoginAppbar'
import { STRINGS } from '../../../src/config/string'
import { AuthForm } from '../../../src/components/AuthForm'
import { LoginLongBtn } from '../../../src/components/LoginLongBtn'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'expo-router'

export default function LoginAuthScreen() {
	const router = useRouter()

	const [msg, setMsg] = useState(STRINGS.LOGIN.AUTH.DETAIL)
	const [isWarning, setWarning] = useState(false)
	const [phoneNumber, setPhoneNumber] = useState('')
	const [isGoodPhoneNumber, setGoodPhoneNumber] = useState(false)
	const [isSendSMS, setSendSMS] = useState(false)

	const [code, setCode] = useState('')
	const [isGoodCode, setGoodCode] = useState(false)

	const finallyPhoneNumber = useRef()

	useEffect(() => {
		const phoneRegex = /^01[0-9][0-9]{3,4}[0-9]{4}$/
		if (phoneNumber.includes('-')) {
			setGoodPhoneNumber(false)
		} else {
			setGoodPhoneNumber(phoneRegex.test(phoneNumber))
		}
		setGoodPhoneNumber(phoneRegex.test(phoneNumber))
	}, [phoneNumber])

	useEffect(() => {
		const codeRegex = /^\d{4}$/
		setGoodCode(codeRegex.test(code))
	}, [code])

	const handleSendBtn = () => {
		// todo api
		setSendSMS(true)
		setWarning(true)
		setMsg(STRINGS.LOGIN.AUTH.WARNING_NO_CODE)
		finallyPhoneNumber.current = phoneNumber
	}

	const handleNextBtn = () => {
		// todo api
		Keyboard.dismiss()
		router.push({
			pathname: '/login/signup/LoginAuthCompleteScreen',
			params: {
				phoneNumber: finallyPhoneNumber.current
			},
		})
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.container}
			>
				{/* 상단 네비게이션 */}
				<LoginAppbar
					title={STRINGS.LOGIN.SIGNUP}
					step={STRINGS.LOGIN.AUTH.STEP}
				/>

				{/* 본인인증 폼 */}
				<AuthForm
					msg={msg}
					isWarning={isWarning}
					phoneNumber={phoneNumber}
					onChangePhoneNumber={setPhoneNumber}
					isGoodPhoneNumber={isGoodPhoneNumber}
					onPressBtn={handleSendBtn}
					code={code}
					onChangeCode={setCode}
				/>

				{/* 다음으로 버튼 */}
				<LoginLongBtn
					isActive={isGoodCode}
					text={STRINGS.LOGIN.AUTH.CHECK_CODE}
					onPress={handleNextBtn}
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
})
