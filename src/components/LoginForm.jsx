import { StyleSheet, Text, View } from 'react-native'
import { LoginInputBox } from './LoginInputBox'
import { STRINGS } from '../config/string'
import Typography from '../styles/typhography'
import Colors from '../styles/color'

export function LoginForm({
	warning_msg,
	id_value,
	onChangeId,
	pw_value,
	onChangePw,
}) {
	return (
		<View style={styles.form}>
			<Text style={styles.label}>{STRINGS.LOGIN.INPUT.SUB_TITLE}</Text>
			<Text style={styles.warning}>{warning_msg}</Text>
			<LoginInputBox
				placeholder={STRINGS.LOGIN.ID}
				value={id_value}
				onChangeText={onChangeId}
			/>
			<LoginInputBox
				placeholder={STRINGS.LOGIN.PW}
				value={pw_value}
				onChangeText={onChangePw}
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
		...Typography.body.large_bold,
		marginBottom: 8,
		alignSelf: 'flex-start',
	},
	warning: {
		...Typography.body.medium,
		marginBottom: 8,
		alignSelf: 'flex-start',
		color: Colors.red100
	},
})
