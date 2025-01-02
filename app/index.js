import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import { TypographyProvider } from '../src/utils/TypographyContext'
import LoginScreen from './login/login/login'

export default function App() {
	return (
		<TypographyProvider>
			<StatusBar style="auto" />
			<LoginScreen />
		</TypographyProvider>
	)
}

// registerRootComponent(App)
