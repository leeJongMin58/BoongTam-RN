import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import { TypographyProvider } from '../src/utils/TypographyContext'
import LoginScreen from './login/login/login'
import Community from './(tabs)/(community)/(main)/community'

export default function App() {
	return (
		<TypographyProvider>
			<StatusBar style="auto" />
			<Community />
		</TypographyProvider>
	)
}

registerRootComponent(App)
