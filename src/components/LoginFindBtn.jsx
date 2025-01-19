import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import Colors from '../styles/color'
import Typography from '../styles/typhography'

export function LoginFindBtn({ text, onPress }) {
	return (
		<TouchableOpacity style={[styles.opacity]} onPress={onPress}>
			<Text style={styles.startButtonText}>{text}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	opacity: {
		paddingTop: 20,
		height: 40,
		borderRadius: 5,
		width: '100%',
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
	},
	startButtonText: {
		...Typography.body.large,
		color: Colors.gray500,
		textAlign: 'center',
	},
})
