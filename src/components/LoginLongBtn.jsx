import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Colors from '../styles/color'
import Typography from '../styles/typhography'

export function LoginLongBtn({ isActive = true, text, onPress }) {
	return (
		<TouchableOpacity
			style={[
				styles.opacity,
				{
					backgroundColor: !isActive
						? Colors.gray200
						: Colors.orange100,
				},
			]}
			onPress={onPress}
			disabled={!isActive}
		>
			<Text style={styles.startButtonText}>{text}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	opacity: {
		height: 50,
		borderRadius: 5,
		width: '100%',
		backgroundColor: Colors.orange100,
		marginBottom: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	startButtonText: {
		...Typography.body.large_bold,
		color: Colors.gray500,
		textAlign: 'center',
	},
})
