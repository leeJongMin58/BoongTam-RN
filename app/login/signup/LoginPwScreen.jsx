import {
	Keyboard,
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
	KeyboardAvoidingView
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
		GOOD : 'good',
		FAIL_REQUIREMENT : 'fail_requirement',
		FAIL_VALID : 'fail_valid',

	}

	const [pw, setPw] = useState('')
	const [validPw, setValidPw] = useState('')
	const [msg, setMsg] = useState(STRINGS.LOGIN.PASSPWORD.DETAIL)
	const [pwState, setPwState] = useState(false)
	const [iswarning, setWarning] = useState(false)
	const [isActiveBtn, setActiveBtn] = useState(false)

	const finallyPw = useRef()

	useEffect(() => {
		
	})

	const handleNextBtn = () => {
		router.push({ 
			pathname : '/login/signup/email',
			params: {
				id:local.id,
				phoneNumber : local.phoneNumber,
				password : finallyPw.current
			}
		})
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
			>
				<LoginAppbar title={STRINGS.LOGIN.SIGNUP} step={STRINGS.LOGIN.PSSWORDSTEP}/>

				<LoginPwForm 
					msg={msg}
					isWarning={iswarning}
					pw={pw}
					onChangePw={setPw}
					validPw={validPw}
					onChangeValidPw={setValidPw}
				/>

				<LoginLongBtn 
					// isActive={isActiveBtn}
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
