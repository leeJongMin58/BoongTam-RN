import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import MapView from 'react-native-maps'

export default function Map({ region }) {
	console.log(region)
	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				region={region} // 중심 좌표 설정
				onRegionChangeComplete={(newRegion) => console.log(newRegion)} // 중심 좌표 변경 핸들링
			/>
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
