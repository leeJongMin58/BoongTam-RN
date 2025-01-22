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

const SignupComplete = () => {
	const router = useRouter()

  const handleNext = () => {
    router.navigate('/boongtam')
  }

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.container}
        onLayout={Keyboard.dismiss()}
			>
				<LoginAppbar
					title={STRINGS.LOGIN.SIGNUP}
					step={'  '}
				/>
				<LoginCheck
					isSuccess={true}
					text={STRINGS.LOGIN.COMPLETE}
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

export default SignupComplete
