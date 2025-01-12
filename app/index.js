import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import { TypographyProvider } from '../src/utils/TypographyContext'
import LoginScreen from './login/login/login'
import BoongTam from './(tabs)/(boongtam)/(main)/boongtam'

export default function App() {
	return (
		<TypographyProvider>
			<StatusBar style="auto" />
			{/* <LoginScreen /> */}
			<BoongTam />
		</TypographyProvider>
	)
}
