import { router } from 'expo-router'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '../styles/color'
import typography from '../styles/typhography'

export function LoginAppbar({title = '', step = ''}) {

	return (
		<View style={styles.header}>
			<TouchableOpacity
				style={styles.backButton}
				onPress={() => router.back()}
			>
				<MaterialIcons
					name="arrow-back"
					size={24}
					color={Colors.gray500}
				/>
			</TouchableOpacity>
			<Text style={styles.headerTitle}>{title}</Text>
			<Text style={styles.pageIndicator}>{step}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		marginTop: 20,
		position: 'absolute',
		top: 20,
		left: 20,
		right: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	backButton: {
		padding: 5,
	},
	headerTitle: {
		...typography.heading.small_bold,
	},
	pageIndicator: {
		...typography.heading.small_bold,
		color: Colors.orange100,
	},
})
