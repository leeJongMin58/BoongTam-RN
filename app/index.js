import { StatusBar } from 'expo-status-bar'
import { TypographyProvider } from '../src/utils/TypographyContext'
import Toast from 'react-native-toast-message'
import OnboardingScreen from './login/login/Onboarding'
import LoginIdScreen from './login/signup/LoginIdScreen'


export default function App() {
	return (
		<TypographyProvider>
			<StatusBar style="auto" />
			<OnboardingScreen />
			{/* <LoginIdScreen /> */}
			<Toast />
		</TypographyProvider>
	)
}
