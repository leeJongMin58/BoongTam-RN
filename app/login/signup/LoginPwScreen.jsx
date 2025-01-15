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

export default function AuthenticationScreen() {
	const local = useLocalSearchParams()
	const router = useRouter()

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
			>
				<LoginAppbar title={STRINGS.LOGIN.SIGNUP} step={STRINGS.LOGIN.PWA.STEP}/>
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
