import { Text, View, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

export default function BoongTamScreen() {
	return (
		<View>
			<Text>붕탐 맵뷰 화면</Text>
			<Link href="/">로그인 화면으로</Link>
		</View>
	)
}
