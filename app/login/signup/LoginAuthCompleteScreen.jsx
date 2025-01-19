import {
	Keyboard,
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
} from 'react-native'
import { LoginAppbar } from '../../../src/components/LoginAppbar'
import { STRINGS } from '../../../src/config/string'
import { LoginCheck } from '../../../src/components/LoginCheck'
import { useRouter, useLocalSearchParams } from 'expo-router'

export default function LoginAuthCompleteScreen() {
    const router = useRouter()
	const local = useLocalSearchParams()

    const handleNext = () => {
        router.push({
			pathname: '/login/signup/LoginIdScreen',
			params: {
				phoneNumber: local.phoneNumber
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
					step={STRINGS.LOGIN.AUTH.STEP}
				/>
				<LoginCheck
					isSuccess={true}
					text={STRINGS.LOGIN.AUTH.AUTH_SUCCESS}
                    onPressBtn={handleNext}
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
