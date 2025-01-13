import React, { useState } from 'react';
import {
	Dimensions,
	View,
	Text,
	StyleSheet,
	FlatList,
	Image,
	TouchableOpacity,
} from 'react-native';
import colors from '../../../../src/styles/color';
import { Link } from 'expo-router'
import PRODUCTS from '../../../(subs)/(shop)/product_list';
import ProductBox from '../../../../src/components/product_box';
const SCREEN_WIDTH = Dimensions.get('window').width;
import typography from '../../../../src/styles/typhography';
import { STRINGS } from '../../../../src/config/string'

const SUB_CATEGORIES = {
	[STRINGS.SHOP.MAIN.CATEGORY_NAME.ACCESSORY]: [STRINGS.SHOP.MAIN.SUB_CATEGORIES.ACCESSORY.KEYLING, STRINGS.SHOP.MAIN.SUB_CATEGORIES.ACCESSORY.GRIPTOK, STRINGS.SHOP.MAIN.SUB_CATEGORIES.ACCESSORY.PHONECASE],
	[STRINGS.SHOP.MAIN.CATEGORY_NAME.DOLL]: [STRINGS.SHOP.MAIN.SUB_CATEGORIES.DOLL.FULL_DOLL, STRINGS.SHOP.MAIN.SUB_CATEGORIES.DOLL.MINI_DOLL, STRINGS.SHOP.MAIN.SUB_CATEGORIES.DOLL.BONGSOON],
	[STRINGS.SHOP.MAIN.CATEGORY_NAME.HOME_PRODUCTS]: [STRINGS.SHOP.MAIN.SUB_CATEGORIES.HOME_PRODUCTS.OVEN, STRINGS.SHOP.MAIN.SUB_CATEGORIES.HOME_PRODUCTS.SHAKER, STRINGS.SHOP.MAIN.SUB_CATEGORIES.HOME_PRODUCTS.TOWEL, STRINGS.SHOP.MAIN.SUB_CATEGORIES.HOME_PRODUCTS.PLATE],
};


export default function ShopScreen() {
	const [selectedCategory, setSelectedCategory] = useState('ALL');
	const [selectedSubCategory, setSelectedSubCategory] = useState(null);
	const [isDropdownOpen, setDropdownOpen] = useState(false);

	const recommendedProducts = PRODUCTS.slice(0, 2); // 상단 추천 상품
	const filteredProducts =
		selectedCategory === 'ALL'
			? PRODUCTS
			: PRODUCTS.filter(
				(product) =>
					product.category === selectedCategory &&
					(selectedSubCategory ? product.name.includes(selectedSubCategory) : true)
			);

	const renderProduct = ({ item }) => (
		<Link
			href={{
				pathname: '/(subs)/(shop)/productdetail',
				params: {
					id: item.id || '',
					name: item.name || '',
					price: item.price || '',
					image: item.image || null,
				},
			}}
			style={styles.card}
		>
			<ProductBox product={item} />  {/* ProductBox 컴포넌트 사용 */}
		</Link>
	);

	const renderRecommendedProduct = ({ item }) => (
		<Link
			href={{
				pathname: '/(subs)/(shop)/productdetail',
				params: {
					id: item.id || '',
					name: item.name || '',
					price: item.price || '',
					image: item.image || null, // 기본값 설정
				}
			}}
			style={styles.recommendCard}
		>
			<Image source={item.image} style={styles.recommendImage} />
			<View style={styles.productInfo}>
				<View style={styles.leftInfo}>
					<Text style={styles.productCategory}>{item.category}</Text>
					<Text style={styles.productName}>{item.name}</Text>
					<Text style={styles.productPrice}>{item.price}</Text>
				</View>
				<Text style={styles.reviewCount}>{STRINGS.SHOP.REVIEW_COUNT}</Text>
			</View>
		</Link>
	);

	return (
		<View style={styles.container}>
			{/* 추천 상품 섹션 */}
			<View style={styles.recommendSection}>
				<View style={styles.recommendTitleWrapper}>
					<Text style={styles.recommendTitle}>{STRINGS.SHOP.MAIN.TODAY_HOT}</Text>
				</View>
				<FlatList
					data={recommendedProducts}
					renderItem={renderRecommendedProduct}
					keyExtractor={(item) => item.id}
					horizontal
					contentContainerStyle={styles.recommendList}
				/>
			</View>

			{/* 카테고리 헤더 */}
			<View style={styles.categoryHeader}>
				<TouchableOpacity
					style={styles.hamburgerMenu}
					onPress={() => setDropdownOpen(!isDropdownOpen)}
				>
					<Text style={styles.hamburgerText}>☰</Text>
				</TouchableOpacity>
				<View style={styles.categoryTitleWrapper}>
					<Text style={styles.categoryTitle}>
						{selectedCategory === 'ALL' ? 'ALL 붕템' : `${selectedCategory} 붕템`}
					</Text>
				</View>
			</View>

			{/* 드롭다운 */}
			{isDropdownOpen && (
				<View style={styles.dropdown}>
					{['ALL', '악세서리', '인형', '생활용품'].map((category) => (
						<TouchableOpacity
							key={category}
							style={styles.dropdownItem}
							onPress={() => {
								setSelectedCategory(category);
								setSelectedSubCategory(null);
								setDropdownOpen(false);
							}}
						>
							<Text style={styles.dropdownText}>{category}</Text>
						</TouchableOpacity>
					))}
				</View>
			)}

			{/* 하위 카테고리 */}
			{selectedCategory !== 'ALL' && SUB_CATEGORIES[selectedCategory] && (
				<View style={styles.subCategoryContainer}>
					{SUB_CATEGORIES[selectedCategory].map((subCategory) => (
						<TouchableOpacity
							key={subCategory}
							style={[
								styles.subCategoryButton,
								selectedSubCategory === subCategory && styles.subCategoryButtonSelected,
							]}
							onPress={() => setSelectedSubCategory(subCategory)}
						>
							<Text
								style={[
									styles.subCategoryText,
									selectedSubCategory === subCategory && styles.subCategoryTextSelected,
								]}
							>
								{subCategory}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			)}

			{/* 상품 리스트 */}
			<FlatList
				data={filteredProducts}
				renderItem={renderProduct}
				keyExtractor={(item) => item.id}
				numColumns={2}
				contentContainerStyle={styles.productList}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.gray200,
	},
	recommendSection: {
		height: '35%',
		marginVertical: 5,
		paddingHorizontal: 5,
	},
	recommendTitleWrapper: {
		backgroundColor: colors.orange100,
		alignSelf: 'center',
		paddingHorizontal: 15,
		paddingVertical: 5,
		borderRadius: 20,
		marginBottom: 10,
		marginTop: 30,
	},
	recommendTitle: {
		...typography.heading.small_bold,
		textAlign: 'center',
		color: colors.gray500,
	},
	recommendList: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	recommendCard: {
		marginRight: 10,
		backgroundColor: colors.white,
		borderRadius: 8,
		padding: 8,
		alignItems: 'center',
		width: SCREEN_WIDTH / 2 - 10,
		shadowColor: colors.gray300,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 1.5,
		elevation: 3,
	},
	recommendImage: {
		width: '100%',
		borderRadius: 10,
		height: 80,
		resizeMode: 'contain',
		marginBottom: 8,
	},
	categoryHeader: {
		position: 'relative',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 16,
		backgroundColor: colors.gray200,
	},
	hamburgerMenu: {
		position: 'absolute',
		left: 16,
	},
	hamburgerText: {
		...typography.heading.medium,
		color: colors.gray500,
	},
	categoryTitleWrapper: {
		backgroundColor: colors.orange100,
		alignSelf: 'center',
		paddingHorizontal: 15,
		paddingVertical: 1,
		borderRadius: 20,
		marginBottom: 5,
		marginTop: 5,
	},
	categoryTitle: {
		...typography.heading.small_bold,
		textAlign: 'center',
		color: colors.gray500,
	},
	dropdown: {
		backgroundColor: colors.white,
		borderWidth: 1,
		borderColor: colors.gray300,
		position: 'absolute',
		top: '40%',
		left: '10%',
		zIndex: 100,
		elevation: 5,
	},
	dropdownItem: {
		padding: 12,
		borderBottomWidth: 1,
		borderBottomColor: colors.gray200,
	},
	dropdownText: {
		...typography.body.medium,
		color: colors.gray500,
	},
	subCategoryContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 5,
	},
	subCategoryButton: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		marginHorizontal: 3,
		borderWidth: 1,
		borderColor: colors.gray300,
		borderRadius: 8,
		backgroundColor: colors.white,
	},
	subCategoryButtonSelected: {
		backgroundColor: colors.orange100,
		borderColor: colors.orange200,
	},
	subCategoryText: {
		...typography.body.small_bold,
		color: colors.gray500,
	},
	subCategoryTextSelected: {
		color: colors.white,
		fontWeight: 'bold',
	},
	productList: {
		paddingHorizontal: 5,
	},
	card: {
		marginTop: 10,
		flex: 1,
		margin: 1,
		backgroundColor: colors.gray200,
		borderRadius: 10,
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	productImage: {
		width: '100%',
		height: 80,
		resizeMode: 'contain',
		marginBottom: 10,
	},
	productInfo: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	},
	leftInfo: {
		alignItems: 'flex-start',
	},
	productCategory: {
		...typography.label.large,
		color: colors.gray400,
		marginBottom: 3,
	},
	productName: {
		...typography.body.medium,
		fontWeight: 'bold',
		color: colors.gray500,
		marginBottom: 5,
	},
	productPrice: {
		...typography.body.large_bold,
		color: colors.orange300,
	},
	reviewCount: {
		...typography.label.normal,
		color: colors.gray400,
		textAlign: 'right',
	},
});
