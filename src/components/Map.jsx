import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import MapView from 'react-native-maps'

export default function Map() {
	const initialRegion = {
		latitude: 37.5665,
		longitude: 126.978,
		latitudeDelta: 0.02,
		longitudeDelta: 0.02,
	}

	return (
		<View style={styles.container}>
			<MapView style={styles.map} initialRegion={initialRegion} />
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
