import {
	Text,
	View,
	StyleSheet,
	ActivityIndicator,
	Pressable,
} from 'react-native'
import { Link } from 'expo-router'
import { useTypography } from '../../../src/utils/TypographyContext'
import colors from '../../../src/styles/color'

export default function LoginScreen() {
	const { typography, fontsLoaded } = useTypography()

	if (!fontsLoaded) {
		return <ActivityIndicator size="large" color={colors.orange200} />
	}

	return (
		<View style={styles.container}>
			<Text style={typography.heading.medium}>로그인 화면</Text>

			<Link href="(tabs)/boongtam" asChild style={styles.button}>
				<Pressable>
					<Text style={typography.heading.medium}>메인화면으로</Text>
				</Pressable>
			</Link>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.orange200,
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		backgroundColor: colors.gray200,
	},
})
