import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '../styles/color'
import { LoginInputBox } from './LoginInputBox'
import typography from '../styles/typhography'

export function LoginBtnInputBox({
	isActive = true,
	placeholder,
	value,
	onChangeText,
    btnText,
    onPressBtn
}) {
	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<LoginInputBox 
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                />
			</View>
			<TouchableOpacity
				style={[
					styles.button,
					{
						backgroundColor: !isActive
							? colors.gray200
							: colors.orange100,
					},
				]}
                onPress={onPressBtn}
                disabled={!isActive}
			>
				<Text style={styles.text}>{btnText}</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 60,
		marginVertical: 4,
	},
	button: {
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 32,
		borderRadius: 5,
		marginLeft: 8,
	},
	inputContainer: {
		flex: 1,
		height: '100%',
	},
    text: {
        ...typography.body.large_bold,
		color: colors.gray500,
		textAlign: 'center',
    }
})
