import { StatusBar } from 'expo-status-bar'
import { TypographyProvider } from '../src/utils/TypographyContext'
import Toast from 'react-native-toast-message'
import OnboardingScreen from './login/login/Onboarding'
import AddressInput from './login/signup/loginAddress'

export default function App() {
	return (
		<TypographyProvider>
			<StatusBar style="auto" />
			<OnboardingScreen />
			{/* <AddressInput /> */}
			<Toast />
		</TypographyProvider>
	)
}
