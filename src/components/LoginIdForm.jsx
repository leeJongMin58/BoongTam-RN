import { StyleSheet } from 'react-native'
import { View, Text } from 'react-native'
import { STRINGS } from '../config/string'
import typography from '../styles/typhography'
import colors from '../styles/color'
import { LoginBtnInputBox } from './LoginBtnInputBox'

export function LoginIdForm({
	msg,
	isWarning,
	id,
	onChangeId,
	isGoodId,
	onPressBtn,
}) {
	return (
		<View>
			<Text style={styles.label}>{STRINGS.LOGIN.ID}</Text>
            <Text style={isWarning ? styles.warning : styles.detil}>{msg}</Text>
            
			<LoginBtnInputBox
				isActive={isGoodId}
				placeholder={STRINGS.LOGIN.ID}
				value={id}
				onChangeText={onChangeId}
				btnText={STRINGS.LOGIN.IDE.IS_DUPILICATE}
				onPressBtn={onPressBtn}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	label: {
		...typography.body.large_bold,
		marginBottom: 8,
		alignSelf: 'flex-start',
	},	detil: {
		...typography.body.medium,
		marginBottom: 12,
		alignSelf: 'flex-start',
		color: colors.gray500,
	},
	warning: {
		...typography.body.medium,
		marginBottom: 12,
		alignSelf: 'flex-start',
		color: colors.red100,
	},
})
