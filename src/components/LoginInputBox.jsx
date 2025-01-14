import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import Colors from '../styles/color'
import typography from '../styles/typhography'
import colors from '../styles/color'

export function LoginInputBox({ placeholder, value, onChangeText, isSecure=false }) {
	return (
		<View>
			<TextInput
				style={[styles.input, value ? styles.inputText : null]} 
				placeholder={placeholder}
                placeholderTextColor={colors.gray300}
				value={value}
				onChangeText={onChangeText}
				secureTextEntry={isSecure}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	input: {
		height: 60,
		borderWidth: 1,
		borderColor: Colors.orange100,
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 10,
		width: '100%',
	},
    inputText: {
        ...typography.body.large,
        color: Colors.gray500
    }
})
