import React, { useEffect, useState } from 'react'
import {
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	Text,
	Image,
} from 'react-native'
import { Menu, MenuItem } from 'react-native-material-menu'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '../../../../src/styles/color'
import Typography from '../../../../src/styles/typhography'
import * as Location from 'expo-location'
import { useRouter } from 'expo-router'
import Map from '../../../../src/components/Map'

export default function Boongtam() {
	const [menuVisible, setMenuVisible] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [isLiked, setIsLiked] = useState(false)
	const [region, setRegion] = useState({
		latitude: 37.5665,
		longitude: 126.978,
		latitudeDelta: 0.00045,
		longitudeDelta: 0.00045,
	})
	const [likeCount, setLikeCount] = useState(225)
	const router = useRouter()

	useEffect

	// Sample data (임시 매장 데이터)
	const sampleStore = {
		id: 1,
		name: '황금F 잉어빵 역삼',
		reviews: 10,
		distance: '22M',
		image: 'https://via.placeholder.com/80',
	}

	// 현재 위치 가져오기
	const getUserLocation = async () => {
		console.log('getUserLocation')
		try {
			const { status } =
				await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				alert('위치 권한이 필요합니다.')
			}
			const location = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.High,
			})
			location.coords // { latitude, longitude }
			setRegion({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				latitudeDelta: 0.0045,
				longitudeDelta: 0.0045,
			})
		} catch (error) {
			alert('위치를 가져오는 중 오류가 발생했습니다.')
		}
	}
	useEffect(() => {
		getUserLocation()
	}, [])

	// 메뉴 열기/닫기
	const showMenu = () => setMenuVisible(true)
	const hideMenu = () => setMenuVisible(false)

	// 하트 버튼 클릭 핸들러
	const toggleLike = () => {
		setIsLiked((prev) => !prev)
		setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
	}

	return (
		<View style={styles.container}>
			{/* MapView 지도 */}
			<Map region={region} />

			{/* 주소 검색 창 */}
			<View style={styles.searchContainer}>
				<TextInput
					style={styles.searchInput}
					placeholder="주소 검색"
					value={searchQuery}
					onChangeText={setSearchQuery}
				/>
				<MaterialIcons
					name="search"
					size={24}
					color={Colors.gray500}
					style={styles.searchIcon}
				/>
			</View>

			{/* 필터와 붕탐 오더 주문현황 버튼 */}
			<View style={styles.buttonRow}>
				<Menu
					visible={menuVisible}
					anchor={
						<TouchableOpacity
							style={styles.filterButton}
							onPress={showMenu}
						>
							<MaterialIcons
								name="menu"
								size={24}
								color={Colors.orange100}
							/>
							<Text style={styles.buttonText}>필터</Text>
						</TouchableOpacity>
					}
					onRequestClose={hideMenu}
				>
					<MenuItem onPress={() => console.log('거리순 선택')}>
						거리순
					</MenuItem>
					<MenuItem onPress={() => console.log('좋아요순 선택')}>
						좋아요순
					</MenuItem>
				</Menu>
				<TouchableOpacity
					style={styles.orderButton}
					onPress={() =>
						router.push('/(subs)/(boongtam)/boongtamOrderSuccess')
					}
				>
					<MaterialIcons
						name="receipt"
						size={24}
						color={Colors.orange100}
					/>
					<Text style={styles.buttonText}>붕탐 오더 주문현황</Text>
				</TouchableOpacity>
			</View>

			{/* 재탐색 버튼 */}
			<TouchableOpacity
				style={styles.refreshButton}
				onPress={getUserLocation}
			>
				<Text style={styles.refreshButtonText}>
					현재 지도에서 붕어빵 재탐색
				</Text>
			</TouchableOpacity>

			{/* 리스트뷰 버튼 */}
			<TouchableOpacity
				style={styles.listViewButton}
				onPress={() => router.push('/(subs)/(boongtam)/boongtamList')}
			>
				<MaterialIcons
					name="list"
					size={20}
					color={Colors.orange100}
					style={styles.listViewIcon}
				/>
				<Text style={styles.listViewButtonText}>리스트뷰</Text>
			</TouchableOpacity>

			{/* 선택된 매장 정보 */}
			<TouchableOpacity
				style={styles.storeCard}
				onPress={() => router.push('/(subs)/(boongtam)/boongtamDetail')}
			>
				<Image
					source={{ uri: sampleStore.image }}
					style={styles.storeImage}
				/>
				<View style={styles.storeInfo}>
					<Text style={styles.storeName}>{sampleStore.name}</Text>
					<Text style={styles.storeDetails}>
						리뷰 {sampleStore.reviews}개 | 거리{' '}
						{sampleStore.distance}
					</Text>
					<View style={styles.storeActions}>
						<TouchableOpacity
							style={[styles.storeButton, styles.storeButtonFull]}
							onPress={() =>
								router.push('/(subs)/(boongtam)/boongtamDetail')
							}
						>
							<MaterialIcons
								name="menu"
								size={24}
								color={Colors.gray500}
							/>
							<Text style={styles.storeButtonText}>
								붕탐 오더
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.storeButton, styles.storeButtonFull]}
						>
							<MaterialIcons
								name="navigation"
								size={24}
								color={Colors.gray500}
							/>
							<Text style={styles.storeButtonText}>길찾기</Text>
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity
					style={styles.likeButton}
					onPress={toggleLike}
				>
					<MaterialIcons
						name={isLiked ? 'favorite' : 'favorite-border'}
						size={24}
						color={isLiked ? Colors.orange100 : Colors.orange100}
					/>
					<Text>{likeCount}</Text>
				</TouchableOpacity>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	searchContainer: {
		position: 'absolute',
		top: 10,
		left: 10,
		right: 10,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.white,
		borderRadius: 5,
		paddingHorizontal: 10,
		height: 50,
		zIndex: 10, // 지도 위에 배치
	},
	searchInput: {
		flex: 1,
		height: '100%',
		...Typography.body.medium,
	},
	searchIcon: {
		marginLeft: 10,
	},
	buttonRow: {
		position: 'absolute',
		top: 70,
		left: 10,
		right: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		zIndex: 10, // 지도 위에 배치
	},
	filterButton: {
		flex: 2.5, // 크기를 넓힘
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.white,
		borderWidth: 1,
		borderColor: Colors.orange100,
		borderRadius: 5,
		padding: 10,
		marginRight: 5,
	},
	orderButton: {
		flex: 2, // 크기를 줄임
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.white,
		borderWidth: 1,
		borderColor: Colors.orange100,
		borderRadius: 5,
		padding: 10,
		marginLeft: 5,
	},
	buttonText: {
		marginLeft: 5,
		...Typography.body.medium,
		color: Colors.gray500,
	},
	refreshButton: {
		position: 'absolute',
		top: 130,
		alignSelf: 'center',
		backgroundColor: Colors.orange100,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		zIndex: 10, // 지도 위에 배치
	},
	refreshButtonText: {
		color: Colors.white,
		...Typography.body.medium_bold,
	},
	listViewButton: {
		flexDirection: 'row',
		position: 'absolute',
		bottom: 140,
		right: 20, // 오른쪽에서 20 띄움
		alignItems: 'center', // 아이콘과 텍스트 정렬
		backgroundColor: Colors.white,
		borderColor: Colors.orange100,
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		zIndex: 10, // 지도 위에 배치
	},
	listViewIcon: {
		marginRight: 5, // 아이콘과 텍스트 간격 추가
	},
	listViewButtonText: {
		color: Colors.gray500,
		...Typography.body.medium_bold,
	},
	storeCard: {
		position: 'absolute',
		bottom: 20,
		left: 10,
		right: 10,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.white,
		borderColor: Colors.orange100,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		zIndex: 10, // 지도 위에 배치
		elevation: 3,
	},
	storeImage: {
		width: 80,
		height: 80,
		borderRadius: 10,
		marginRight: 10,
	},
	storeInfo: {
		flex: 1,
	},
	storeName: {
		...Typography.body.large_bold,
		color: Colors.gray500,
	},
	storeDetails: {
		...Typography.body.small,
		color: Colors.gray300,
	},
	storeActions: {
		flexDirection: 'row',
		marginTop: 10,
		justifyContent: 'space-between',
	},
	storeButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.orange100,
		borderRadius: 5,
		padding: 10,
		flex: 1,
		marginRight: 10,
	},
	storeButtonFull: {
		marginRight: 5, // 양쪽 꽉 차게
	},
	storeButtonText: {
		marginLeft: 5,
		...Typography.body.medium,
		color: Colors.gray500,
	},
	likeButton: {
		position: 'absolute',
		top: 10,
		right: 10,
		alignItems: 'center',
	},
})
