import { StatusBar } from 'expo-status-bar'
import { TypographyProvider } from '../src/utils/TypographyContext'
import LoginScreen from './login/login/login'
import Toast from 'react-native-toast-message'

export default function App() {
	return (
		<TypographyProvider>
			<StatusBar style="auto" />
			<LoginScreen />
			<Toast />
		</TypographyProvider>
	)
}
