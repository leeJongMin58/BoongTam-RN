import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import { TypographyProvider } from '../src/utils/TypographyContext'
import LoginScreen from './login/login/login'
import MyScreen from './(tabs)/(my)/(main)/my'

export default function App() {
	return (
		<TypographyProvider>
			<StatusBar style="auto" />
			<MyScreen />
		</TypographyProvider>
	)
}

registerRootComponent(App)
