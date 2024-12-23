import { registerRootComponent } from 'expo'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import {
	useTypography,
	TypographyProvider,
} from '../src/utils/TypographyContext'
import colors from '../src/styles/color'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LoginScreen from './login/login/login'

function AppContent() {
	const { typography, fontsLoaded } = useTypography()

	if (!fontsLoaded) {
		return <ActivityIndicator size="large" color={colors.orange200} />
	}

	return (
		<View style={styles.container}>
			<MaterialIcons name="phishing" size={30} color={colors.gray500} />
			<Text style={typography.heading.medium}>헤딩 미디움 붕어빵</Text>
			<Text style={typography.body.large}>바디 라지 붕어빵</Text>
			<Text style={typography.label.small}>라벨 스몰 붕어빵</Text>
		</View>
	)
}

export default function App() {
	return (
		<TypographyProvider>
			<StatusBar style="auto" />
			<LoginScreen />
		</TypographyProvider>
	)
}

registerRootComponent(App)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.orange200,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
