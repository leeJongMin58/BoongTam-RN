import { Text, View, StyleSheet, TextInput } from 'react-native'
import { Link } from 'expo-router'
import colors from '../../../../src/styles/color'
import Map from '../../../../src/components/Map'

export default function BoongTamScreen() {
	return (
		<View style={styles.container}>
			<Map style={styles.map} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		flex: 1,
	},
})
