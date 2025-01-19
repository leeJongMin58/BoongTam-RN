import { View,Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import colors from '../styles/color'
import { StyleSheet } from 'react-native'
import typography from '../styles/typhography'
import { STRINGS } from '../config/string'
import { LoginLongBtn } from './LoginLongBtn'

export function LoginCheck({ isSuccess, text, onPressBtn }) {
	return (
		<View style={styles.container}>
			<View style={styles.iconWrapper}>
				<View style={styles.iconCircle}>
					<MaterialIcons
						name={isSuccess ? 'check' : 'close'}
						size={100}
						color={colors.white}
					/>
				</View>

				<Text style={styles.title}>{text}</Text>
			</View>
			<View style={styles.footer}>
				<LoginLongBtn 
					text={STRINGS.LOGIN.NEXT}
					onPress={onPressBtn}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container : {
		flex:1,
		justifyContent: 'center'
	},
	iconWrapper: {
		marginBottom: 30,
		alignItems:'center',
		justifyContent: 'center'
	},
	iconCircle: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: colors.orange100,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		...typography.heading.medium,
		marginTop: 40,
		textAlign: 'center',
	},
	footer : {
		position: 'absolute',
		bottom: 20,
		left: 20,
		right: 20,
		justifyContent: 'center',
		alignItems: 'center',
	}
})
