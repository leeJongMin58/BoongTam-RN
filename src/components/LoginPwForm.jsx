import { StyleSheet, Text, View } from 'react-native'
import { LoginInputBox } from './LoginInputBox'
import { STRINGS } from '../config/string'
import typography from '../styles/typhography'
import colors from '../styles/color'

export function LoginPwForm({
	msg,
	isWarning = false,
	pw,
	onChangePw,
	validPw,
	onChangeValidPw,
}) {
	return (
		<View>
			<Text style={styles.label}>{STRINGS.LOGIN.PW}</Text>
			<Text style={isWarning ? styles.warning : styles.detil}>{msg}</Text>

			<LoginInputBox
				placeholder={STRINGS.LOGIN.PW}
				value={pw}
				onChangeText={onChangePw}
				isSecure={true}
			/>

			<Text style={styles.label}>{STRINGS.LOGIN.PASSPWORD.VALID_PW}</Text>
			<LoginInputBox
				placeholder={STRINGS.LOGIN.PASSPWORD.VALID_PW}
				value={validPw}
				onChangeText={onChangeValidPw}
				isSecure={true}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	form: {
		marginTop: 60,
		justifyContent: 'center',
		width: '100%',
	},
	label: {
		...typography.body.large_bold,
		marginBottom: 8,
		alignSelf: 'flex-start',
	},
	warning: {
		...typography.body.medium,
		marginBottom: 8,
		alignSelf: 'flex-start',
		color: colors.red100,
	},
})
