import { Text, View, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

export default function CommunityScreen() {
	return (
		<View>
			<Text>커뮤니티 화면</Text>
			<Link href="/">로그인 화면으로</Link>
		</View>
	)
}
