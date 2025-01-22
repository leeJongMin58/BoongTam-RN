import {
	Keyboard,
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { LoginAppbar } from '../../../src/components/LoginAppbar'
import { STRINGS } from '../../../src/config/string'
import { LoginIdForm } from '../../../src/components/LoginIdForm'
import { LoginLongBtn } from '../../../src/components/LoginLongBtn'
import { useState, useEffect, useRef } from 'react'
import { isDuplicateIDUseCase } from '../../../src/usecases/authUsecase'

export default function LoginIdScreen() {
	const local = useLocalSearchParams()
	const router = useRouter()

	const idStates = {
		GOOD : 'good',
		FAIL_REQUIREMENT : 'fail_requirement',
		TODO_VALI_DUPLICATION : 'todo_vali_dupilcation',
		DUPICATION : 'duplication'
	}

	const [msg, setMsg] = useState(STRINGS.LOGIN.IDE.DETIAL)
	const [isWarning, setWarning] = useState(false)
	const [id, setId] = useState('')
	const [idState, setIdState] = useState(idStates.FAIL_REQUIREMENT)

	const finallyId = useRef()

	useEffect(() => {
		setIdState(idStates.FAIL_REQUIREMENT)
		const codeRegex = /^[a-zA-Z0-9]{4,20}$/
		if (codeRegex.test(id)) {
			setIdState(idStates.TODO_VALI_DUPLICATION)
			setWarning(false)
			setMsg(STRINGS.LOGIN.IDE.GO_DUPLICATE_TEST)
		} else {
			setWarning(true)
			setMsg(STRINGS.LOGIN.IDE.DETIAL)
		}
	}, [id])

	useEffect(() => {
		console.log(idState)
	}, [idState])

	const handleDuplicateBtn = async () => {
		try {
			finallyId.current = id
			const result = await isDuplicateIDUseCase(finallyId.current)
			if (result.code == 200) {
				setMsg(STRINGS.LOGIN.IDE.GOOD_ID)
				setWarning(false)
				setIdState(idStates.GOOD)
	
			} if (result.code == 409) {
				setMsg(STRINGS.LOGIN.IDE.WARNING_DUPICATE)
				setWarning(true)
			} else {
				// todo error 처리
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleNextBtn = () => {
		Keyboard.dismiss()
		router.push({
			pathname: '/login/signup/LoginPwScreen',
			params: {
				phoneNumber: local.phoneNumber,
				id: finallyId.current,
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
					step={STRINGS.LOGIN.IDE.STEP}
				/>

				<LoginIdForm
					msg={msg}
					isWarning={isWarning}
					id={id}
					onChangeId={setId}
					isGoodId={idState != idStates.FAIL_REQUIREMENT}
					onPressBtn={handleDuplicateBtn}
				/>

				<LoginLongBtn
					isActive={idState == idStates.GOOD}
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
