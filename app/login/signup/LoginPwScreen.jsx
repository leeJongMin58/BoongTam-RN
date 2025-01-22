import {
	Keyboard,
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { useState, useEffect, useRef } from 'react'
import { LoginAppbar } from '../../../src/components/LoginAppbar'
import { STRINGS } from '../../../src/config/string'
import { LoginPwForm } from '../../../src/components/LoginPwForm'
import { LoginLongBtn } from '../../../src/components/LoginLongBtn'


export default function LoginPwScreen() {
	const local = useLocalSearchParams()
	const router = useRouter()

	const pwStates = {
		GOOD: 'good',
		FAIL_REQUIREMENT: 'fail_requirement',
		FAIL_VALID: 'fail_valid',
	}

	const [pw, setPw] = useState('')
	const [validPw, setValidPw] = useState('')
	const [msg, setMsg] = useState(STRINGS.LOGIN.PASSPWORD.DETAIL)
	const [pwState, setPwState] = useState(false)
	const [iswarning, setWarning] = useState(false)

	const finallyPw = useRef()

	useEffect(() => {
		setPwState(pwStates.FAIL_REQUIREMENT)
		setValidPw('')
		const regex = /^[A-Za-z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/-]{8,20}$/
		if (regex.test(pw)) {
			setPwState(pwStates.FAIL_VALID)
			setWarning(true)
			setMsg(STRINGS.LOGIN.PASSPWORD.WARNING_NOT_SAME)
			finallyPw.current = pw
		} else {
			setWarning(true)
			setMsg(STRINGS.LOGIN.PASSPWORD.DETAIL)
		}
	}, [pw])

	useEffect(() => {
		const regex = /^[A-Za-z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/-]{8,20}$/
		if(regex.test(finallyPw.current)) {
			setPwState(pwStates.FAIL_VALID)
			if(finallyPw.current == validPw) {
				setPwState(pwStates.GOOD)
				setWarning(false)
				setMsg(STRINGS.LOGIN.PASSPWORD.VALID_PW)
			}
		} else {
			setPwState(pwStates.FAIL_REQUIREMENT)
			setWarning(true)
			setMsg(STRINGS.LOGIN.PASSPWORD.WARNING_NOT_SAME)
		}
	}, [validPw])

	const handleNextBtn = () => {
		Keyboard.dismiss()
		router.push({
			pathname: '/login/signup/loginEmail',
			params: {
				id: local.id,
				phoneNumber: local.phoneNumber,
				password: finallyPw.current,
			},
		})
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.container}
			>
				<LoginAppbar
					title={STRINGS.LOGIN.SIGNUP}
					step={STRINGS.LOGIN.PSSWORDSTEP}
				/>

				<LoginPwForm
					msg={msg}
					isWarning={iswarning}
					pw={pw}
					onChangePw={setPw}
					validPw={validPw}
					onChangeValidPw={setValidPw}
				/>

				<LoginLongBtn
					isActive={pwState == pwStates.GOOD}
					text={STRINGS.LOGIN.NEXT}
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
