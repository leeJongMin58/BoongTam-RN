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
