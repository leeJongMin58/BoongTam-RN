import { Link } from 'expo-router'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../styles/color'
import Typography from '../styles/typhography'

export function LoginBottomBtn({
	pathname,
	signInfo,
	isNextButtonEnabled,
	handleNext,
}) {
	return (
		<View style={styles.footer}>
			<Link
				push
				href={{
					pathname: pathname,
					params: { signInfo: JSON.stringify(signInfo) },
				}}
				style={[
					styles.nextButton,
					{
						backgroundColor: isNextButtonEnabled 
							? Colors.orange100
							: Colors.gray200,
					},
				]}
				disabled={!isNextButtonEnabled}
				onPress={handleNext}
			>
				<Text style={styles.nextButtonText}>
							{isNextButtonEnabled ? '다음' : '건너뛰기'}
						</Text>
			</Link>
		</View>
	)
}

const styles = StyleSheet.create({
	footer: {
		position: 'absolute',
		bottom: 20,
		left: 20,
		right: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	nextButton: {
		height: 50,
		borderRadius: 5,
		width: '100%',
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	nextButtonText: {
		...Typography.body.large_bold,
		color: Colors.gray500,
	},
})
