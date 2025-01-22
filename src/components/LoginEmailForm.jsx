import { StyleSheet, Text, View } from 'react-native'
import { LoginInputBox } from './LoginInputBox'
import colors from '../styles/color'
import typography from '../styles/typhography'
import { STRINGS } from '../config/string'

export default function LoginEmailForm({
    email,
    onChangeEmail
}) {
	return (
		<View>
			<Text style={styles.label}>{STRINGS.LOGIN.EMAIl.EMAIL}</Text>
			<Text>{STRINGS.LOGIN.EMAIl.WARNING_EMAIL}</Text>
			<LoginInputBox 
                placeholder={STRINGS.LOGIN.EMAIl.EMAIL}
                value={email}
                onChangeText={onChangeEmail}
            />
		</View>
	)
}

const styles = StyleSheet.create({
	label: {
		...typography.body.large_bold,
		marginBottom: 8,
		alignSelf: 'flex-start',
	},
})
