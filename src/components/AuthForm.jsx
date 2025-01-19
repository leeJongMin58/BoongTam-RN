import { StyleSheet, Text, View } from 'react-native'
import { LoginInputBox } from './LoginInputBox'
import { LoginBtnInputBox } from './LoginBtnInputBox'
import { STRINGS } from '../config/string'
import Typography from '../styles/typhography'
import Colors from '../styles/color'

export function AuthForm({
	msg,
	isWarning,
	phoneNumber,
	onChangePhoneNumber,
	isGoodPhoneNumber,
	onPressBtn,
	code,
	onChangeCode,
}) {
	return (
		<View style={styles.form}>
			<Text style={styles.label}>{STRINGS.LOGIN.AUTH.SUB_TITLE}</Text>
			<Text style={isWarning ? styles.warning : styles.detil}>{msg}</Text>

			<LoginBtnInputBox
				isActive={isGoodPhoneNumber}
				placeholder={STRINGS.LOGIN.AUTH.PLACEHOLDER}
				value={phoneNumber}
				onChangeText={onChangePhoneNumber}
				btnText={STRINGS.LOGIN.AUTH.SEND}
				onPressBtn={onPressBtn}
			/>

			<LoginInputBox
				placeholder={STRINGS.LOGIN.AUTH.PLACEHOLDER2}
				value={code}
				onChangeText={onChangeCode}
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
	detil: {
		...Typography.body.medium,
		marginBottom: 8,
		alignSelf: 'flex-start',
		color: Colors.gray500,
	},
	warning: {
		...Typography.body.medium,
		marginBottom: 8,
		alignSelf: 'flex-start',
		color: Colors.red100,
	},
})
