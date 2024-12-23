import { Text, View, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

export default function CommunityScreen() {
	return (
		<View>
			<Text>마이 페이지 화면</Text>
			<Link href="/">로그인 화면으로</Link>
		</View>
	)
}
