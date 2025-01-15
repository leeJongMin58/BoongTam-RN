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

export default function LoginIdScreen() {
	const local = useLocalSearchParams()
	const router = useRouter()

	const [msg, setMsg] = useState(STRINGS.LOGIN.IDE.DETIAL)
	const [isWarning, setWarning] = useState(false)
	const [id, setId] = useState('')
	const [isGoodId, setGoodId] = useState(false)
	const [isDuplicateId, setDuplicateId] = useState(false)

	const finallyId = useRef()

	useEffect(() => {
		const codeRegex = /^[a-zA-Z0-9]{4,20}$/
		setGoodId(codeRegex.test(id))
		setDuplicateId(false)
	}, [id])

	const handleDuplocateBtn = () => {
		// todo api
		setDuplicateId(true)
		setMsg(STRINGS.LOGIN.IDE.GOOD_ID)
		finallyId.current = id
	}

	const handleNextBtn = () => {
		router.push({
			pathname: '/login/signup/LoginPwScreen',
			params: {
				phoneNumber: local.phoneNumber,
				id : finallyId.current
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
					isGoodId={isGoodId}
					onPressBtn={handleDuplocateBtn}
				/>

				<LoginLongBtn isActive={isDuplicateId} text={STRINGS.LOGIN.NEXT} onPress={handleNextBtn}/>
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
