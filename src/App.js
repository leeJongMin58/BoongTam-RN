import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { TypographyProvider, useTypography } from './utils/TypographyContext'
import colors from './styles/color'

function AppContent() {
	const { typography, fontsLoaded } = useTypography() // Context에서 typography 가져오기

	if (!fontsLoaded) {
		return <ActivityIndicator size="large" color={colors.orange200} />
	}

	return (
		<View style={styles.container}>
			<Text style={typography.heading.medium}>
				헤딩 미디움 붕어빵
			</Text>
			<Text style={typography.body.large}>
				바디 라지 붕어빵
			</Text>
			<Text style={typography.label.small}>
				라벨 스몰 붕어빵
			</Text>
		</View>
	)
}

export default function App() {
	return (
		<TypographyProvider>
			<AppContent />
		</TypographyProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.orange200,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
