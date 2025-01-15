import { StyleSheet, Text, View } from 'react-native'
import { LoginInputBox } from './LoginInputBox'
import { STRINGS } from '../config/string'
import typography from '../styles/typhography'
import colors from '../styles/color'

export function LoginPwForm({}) {
	return (
        <View>

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

