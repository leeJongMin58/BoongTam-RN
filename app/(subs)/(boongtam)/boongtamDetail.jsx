import React, { useRef, useState } from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Image,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from 'react-native-vector-icons'
import { Menu, MenuItem } from 'react-native-material-menu'
import Colors from '../../../src/styles/color'
import Typography from '../../../src/styles/typhography'
import { useRouter } from 'expo-router'
import { STRINGS } from '../../../src/config/string'

const BoongtamDetail = () => {
	const router = useRouter()
	const scrollViewRef = useRef(null)

	const menuSectionRef = useRef(null)
	const photoSectionRef = useRef(null)
	const reviewSectionRef = useRef(null)

	const [selectedTab, setSelectedTab] = useState('menu')
	const [photoFilterMenuVisible, setPhotoFilterMenuVisible] = useState(false)
	const [reviewFilterMenuVisible, setReviewFilterMenuVisible] =
		useState(false)

	const scrollToSection = (sectionRef) => {
		sectionRef?.current?.measureLayout(
			scrollViewRef.current,
			(x, y) => {
				scrollViewRef.current.scrollTo({ y: y - 100, animated: true })
			},
			() => {},
		)
	}

	const handleTabPress = (tabName, sectionRef) => {
		setSelectedTab(tabName)
		scrollToSection(sectionRef)
	}

	const showPhotoFilterMenu = () => setPhotoFilterMenuVisible(true)
	const hidePhotoFilterMenu = () => setPhotoFilterMenuVisible(false)

	const showReviewFilterMenu = () => setReviewFilterMenuVisible(true)
	const hideReviewFilterMenu = () => setReviewFilterMenuVisible(false)

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView ref={scrollViewRef}>
				{/* 상단 네비게이션 */}
				<View style={styles.header}>
					<TouchableOpacity
						style={styles.backbutton}
						onPress={() => router.back()}
					>
						<MaterialIcons
							name="arrow-back"
							size={24}
							color={Colors.gray500}
						/>
					</TouchableOpacity>
					<Text style={styles.headerTitle}>
						{STRINGS.BOONG_TAM.STORE.STORE_INFO}
					</Text>
				</View>

				{/* 가게 정보 */}
				<View style={styles.section}>
					<Text style={styles.storeTitle}>
						황금F 잉어빵 역삼GFC역점
					</Text>
					<View style={styles.storeDetails}>
						<Text style={styles.detailText}>리뷰 10개</Text>
						<Text style={styles.detailText}>|</Text>
						<Text style={styles.detailText}>거리 22M</Text>
					</View>
					<View style={styles.storeDescriptionContainer}>
						<Text style={styles.storeDescription}>
							역삼에서 가장 맛있는 붕어빵 집!
						</Text>
					</View>
				</View>

				{/* 추가 버튼 섹션 */}
				<View style={styles.section}>
					<View style={styles.actionButtonContainer}>
						<TouchableOpacity style={styles.actionButton}>
							<MaterialIcons
								name="favorite"
								size={24}
								color={Colors.orange100}
							/>
							<Text style={styles.actionButtonText}>20</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.actionButton}>
							<MaterialIcons
								name="navigation"
								size={24}
								color={Colors.orange100}
							/>
							<Text style={styles.actionButtonText}>
								{STRINGS.BOONG_TAM.INFO.FIND_LOAD}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.actionButton}
							onPress={() =>
								router.push(
									'/(subs)/(community)/store_review_write',
								)
							}
						>
							<MaterialIcons
								name="rate-review"
								size={24}
								color={Colors.orange100}
							/>
							<Text style={styles.actionButtonText}>
								{STRINGS.BOONG_TAM.REVIEW.WRITE_REVIEW}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.actionButton}
							onPress={() =>
								router.push('/(subs)/(community)/submit_store')
							}
						>
							<MaterialIcons
								name="report"
								size={24}
								color={Colors.orange100}
							/>
							<Text style={styles.actionButtonText}>
								{STRINGS.BOONG_TAM.INFO.REPORTING}
							</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* 지도 섹션 */}
				<View style={styles.section}>
					<View style={styles.mapContainer}>
						<Image
							source={{
								uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUWiIlh3e6U5L1BYv-CS6Kxvsv6U_Phq3P6g&s',
							}}
							style={styles.photo}
						/>
					</View>
				</View>

				{/* 가게 정보 추가 */}
				<View style={styles.section}>
					<View style={styles.infoRow}>
						<Text style={styles.infoLabel}>
							{STRINGS.BOONG_TAM.STORE.STORE_FORM}
						</Text>
						<Text style={styles.infoValue}>매장</Text>
					</View>
					<View style={styles.infoRow}>
						<Text style={styles.infoLabel}>
							{STRINGS.BOONG_TAM.STORE.STORE_APPEARANCE}
						</Text>
						<Text style={styles.infoValue}>월, 화, 수, 목, 금</Text>
					</View>
					<View style={styles.infoRow}>
						<Text style={styles.infoLabel}>
							{STRINGS.BOONG_TAM.STORE.STORE_TIME}
						</Text>
						<Text style={styles.infoValue}>10:00 - 18:00</Text>
					</View>
					<View style={styles.infoRow}>
						<Text style={styles.infoLabel}>
							{STRINGS.BOONG_TAM.PAY.PAYMENT_METHOD}
						</Text>
						<Text style={styles.infoValue}>현금, 카드</Text>
					</View>
				</View>

				{/* 붕탐오더 주문하기 */}
				<View style={styles.section}>
					<TouchableOpacity
						style={styles.orderButton}
						onPress={() =>
							router.push('/(subs)/(boongtam)/boongtamMenuList')
						}
					>
						<Text style={styles.orderButtonText}>
							{STRINGS.BOONG_TAM.ORDER.BOONG_TAM_ORDER}
						</Text>
					</TouchableOpacity>
				</View>

				{/* 탭 */}
				<View style={styles.tabContainer}>
					<TouchableOpacity
						style={[
							styles.tab,
							selectedTab === 'menu' && styles.selectedTab,
						]}
						onPress={() => handleTabPress('menu', menuSectionRef)}
					>
						<Text style={styles.tabText}>
							{STRINGS.BOONG_TAM.INFO.MENU}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.tab,
							selectedTab === 'photo' && styles.selectedTab,
						]}
						onPress={() => handleTabPress('photo', photoSectionRef)}
					>
						<Text style={styles.tabText}>
							{STRINGS.BOONG_TAM.INFO.PHOTO}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.tab,
							selectedTab === 'review' && styles.selectedTab,
						]}
						onPress={() =>
							handleTabPress('review', reviewSectionRef)
						}
					>
						<Text style={styles.tabText}>
							{STRINGS.BOONG_TAM.REVIEW.REVIEW}
						</Text>
					</TouchableOpacity>
				</View>

				{/* 메뉴 섹션(임시데이터) */}
				<View style={styles.section} ref={menuSectionRef}>
					<View style={styles.menuItem}>
						<View>
							<Text style={styles.menuName}>슈크림 붕어빵</Text>
							<Text style={styles.menuPrice}>500원 / 1개</Text>
						</View>
						<Image
							source={{
								uri: 'data:image/webp;base64,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',
							}}
							style={styles.menuImage}
						/>
					</View>
				</View>
				<View style={styles.section} ref={menuSectionRef}>
					<View style={styles.menuItem}>
						<View>
							<Text style={styles.menuName}>팥 붕어빵</Text>
							<Text style={styles.menuPrice}>500원 / 1개</Text>
						</View>
						<Image
							source={{
								uri: 'data:image/webp;base64,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',
							}}
							style={styles.menuImage}
						/>
					</View>
					<View style={styles.menuItem}>
						<View>
							<Text style={styles.menuName}>피자 붕어빵</Text>
							<Text style={styles.menuPrice}>1000원 / 1개</Text>
						</View>
						<Image
							source={{
								uri: 'data:image/webp;base64,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',
							}}
							style={styles.menuImage}
						/>
					</View>
					<View style={styles.menuItem}>
						<View>
							<Text style={styles.menuName}>초콜릿 붕어빵</Text>
							<Text style={styles.menuPrice}>1000원 / 1개</Text>
						</View>
						<Image
							source={{
								uri: 'data:image/webp;base64,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',
							}}
							style={styles.menuImage}
						/>
					</View>
				</View>

				{/* 사진 섹션 */}
				<View style={styles.section} ref={photoSectionRef}>
					<Menu
						visible={photoFilterMenuVisible}
						anchor={
							<TouchableOpacity
								style={styles.filterButton}
								onPress={showPhotoFilterMenu}
							>
								<MaterialIcons
									name="menu"
									size={24}
									color={Colors.orange100}
								/>
								<Text style={styles.filterText}>
									{STRINGS.BOONG_TAM.FILTER}
								</Text>
							</TouchableOpacity>
						}
						onRequestClose={hidePhotoFilterMenu}
					>
						<MenuItem
							onPress={() => {
								hidePhotoFilterMenu()
								console.log('음식 선택')
							}}
						>
							{STRINGS.BOONG_TAM.INFO.FOOD}
						</MenuItem>
						<MenuItem
							onPress={() => {
								hidePhotoFilterMenu()
								console.log('외부 선택')
							}}
						>
							{STRINGS.BOONG_TAM.INFO.OUTSIDE}
						</MenuItem>
						<MenuItem
							onPress={() => {
								hidePhotoFilterMenu()
								console.log('내부 선택')
							}}
						>
							{STRINGS.BOONG_TAM.INFO.INSIDE}
						</MenuItem>
					</Menu>
					<Image
						source={{ uri: 'https://via.placeholder.com/300x150' }}
						style={styles.photo}
					/>
				</View>

				{/* 리뷰 섹션 (리뷰컴포넌트 제작시 수정예정)*/}
				<View style={styles.section} ref={reviewSectionRef}>
					<Menu
						visible={reviewFilterMenuVisible}
						anchor={
							<TouchableOpacity
								style={styles.filterButton}
								onPress={showReviewFilterMenu}
							>
								<MaterialIcons
									name="menu"
									size={24}
									color={Colors.orange100}
								/>
								<Text style={styles.filterText}>
									{STRINGS.BOONG_TAM.FILTER}
								</Text>
							</TouchableOpacity>
						}
						onRequestClose={hideReviewFilterMenu}
					>
						<MenuItem
							onPress={() => {
								hideReviewFilterMenu()
								console.log('좋아요순 선택')
							}}
						>
							{STRINGS.BOONG_TAM.INFO.LIKE}
						</MenuItem>
						<MenuItem
							onPress={() => {
								hideReviewFilterMenu()
								console.log('최신순 선택')
							}}
						>
							{STRINGS.BOONG_TAM.INFO.LATEST}
						</MenuItem>
					</Menu>
					<View style={styles.reviewItem}>
						<Image
							source={{ uri: 'https://via.placeholder.com/50' }}
							style={styles.reviewerImage}
						/>
						<View>
							<Text style={styles.reviewerName}>황일찬</Text>
							<Text style={styles.reviewText}>
								제가 반죽이 부드러운 붕어빵을 좋아하는데...
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.gray100,
		// padding: 10
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomWidth: 1,
		borderBottomColor: Colors.gray200,
		padding: 10,
	},
	backbutton: { position: 'absolute', left: 5, padding: 5 },
	headerTitle: { ...Typography.heading.small_bold, textAlign: 'center' },
	section: {
		backgroundColor: Colors.white,
		padding: 15,
		marginBottom: 10,
		borderRadius: 5,
	},
	storeTitle: {
		...Typography.heading.medium,
		marginBottom: 20,
		textAlign: 'center',
	},
	storeDetails: { flexDirection: 'row', justifyContent: 'flex-end' },
	detailText: { marginLeft: 20, ...Typography.label.large, marginBottom: 10 },
	storeDescriptionContainer: { alignItems: 'center', marginVertical: 10 },
	storeDescription: {
		...Typography.body.large,
		textAlign: 'center',
		color: Colors.gray500,
	},
	mapContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 10,
	},
	map: { width: '100%', height: 200, borderRadius: 10 },
	tabContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: Colors.white,
	},
	tab: { paddingVertical: 10, flex: 1, alignItems: 'center' },
	selectedTab: { borderBottomWidth: 3, borderBottomColor: Colors.orange100 },
	tabText: { ...Typography.body.large, color: Colors.orange100 },
	menuItem: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
		justifyContent: 'space-between',
	},
	menuImage: { width: 80, height: 80, borderRadius: 10 },
	menuName: { ...Typography.body.medium_bold },
	menuPrice: { ...Typography.body.small },
	photo: { width: '100%', height: 150, borderRadius: 5 },
	filterButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 5,
		width: 100,
		borderWidth: 1,
		borderColor: Colors.orange100,
		backgroundColor: Colors.white,
		borderRadius: 5,
		marginBottom: 10,
	},
	filterText: {
		color: Colors.gray500,
		...Typography.body.small,
		marginLeft: 5,
	},
	orderButton: {
		backgroundColor: Colors.orange100,
		borderRadius: 5,
		paddingVertical: 15,
		alignItems: 'center',
	},
	orderButtonText: { color: Colors.white, ...Typography.body.large_bold },
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	infoLabel: { ...Typography.body.medium, color: Colors.gray500 },
	infoValue: { ...Typography.body.medium_bold, color: Colors.gray900 },
	reviewItem: {
		flexDirection: 'row',
		marginBottom: 10,
		alignItems: 'center',
		marginTop: 10,
	},
	reviewerImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
	reviewerName: { ...Typography.body.medium_bold },
	reviewText: { ...Typography.body.small, color: Colors.gray500 },
	actionButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 15,
	},
	actionButton: { alignItems: 'center' },
	actionButtonText: {
		marginTop: 5,
		...Typography.body.small,
		color: Colors.gray500,
	},
})

export default BoongtamDetail
