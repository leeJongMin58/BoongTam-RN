import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import ReviewCard from "../../../../src/components/reviewcard";
import popularContent from "../../../(subs)/(community)/review_list";

export default function CommunityScreen() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState({});

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => console.log(item.id)}>
      <ReviewCard
        username={item.username}
        type={item.type}
        date={item.date}
        image={item.image}
        title={item.title}
        review={item.review}
        rating={item.rating}
      />
    </TouchableOpacity>
  );

  const toggleMoreMenu = (section) => {
    setIsMoreMenuOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const closeMoreMenu = () => {
    setIsMoreMenuOpen({});
  };

  const filtercontent = popularContent.filter((item) => item.rating >= 4);
  const filterShopcontent = popularContent.filter((item) => item.type === "매장");
  const filterGoodscontent = popularContent.filter((item) => item.type === "굿즈");

  return (
	<ScrollView>
		<View style={styles.container}>
		
		{/* 인기 컨텐츠 섹션 */}
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>인기 컨텐츠</Text>
			<FlatList
			data={filtercontent}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
			horizontal={true}
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.flatListContainer}
			ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
			/>
		</View>

		{/* 매장 리뷰 섹션 */}
		<View style={styles.section}>
			<View style={styles.sectionHeader}>
			<View style={styles.sectionHeader_min}>
				<Text style={styles.sectionTitle}>매장 리뷰</Text>
				<TouchableOpacity
				onPress={() => toggleMoreMenu("storeReviews")}
				style={styles.moreButton}
				>
				<View style={styles.container_arrow}>
					<MaterialIcons name="keyboard-arrow-down" size={20} color="black" />
				</View>
				</TouchableOpacity>
			</View>
			<FlatList
				data={filterShopcontent}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.flatListContainer}
				ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
			/>
			</View>
			{isMoreMenuOpen.storeReviews && (
			<View style={[styles.modalContainer, { top: -10 }]}>
				<TouchableOpacity onPress={closeMoreMenu}>
				<Text style={styles.modalText}>최신순</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={closeMoreMenu}>
				<Text style={styles.modalText}>인기순</Text>
				</TouchableOpacity>
			</View>
			)}
		</View>

		{/* 굿즈 리뷰 섹션 */}
		<View style={styles.section}>
			<View style={styles.sectionHeader}>
			<View style={styles.sectionHeader_min}>
				<Text style={styles.sectionTitle}>굿즈 리뷰</Text>
				<TouchableOpacity
				onPress={() => toggleMoreMenu("goodsReviews")}
				style={styles.moreButton}
				>
				<View style={styles.container_arrow}>
					<MaterialIcons name="keyboard-arrow-down" size={20} color="black" />
				</View>
				</TouchableOpacity>
			</View>
			<FlatList
				data={filterGoodscontent}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.flatListContainer}
				ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
			/>
			</View>
			{isMoreMenuOpen.goodsReviews && (
			<View style={[styles.modalContainer, { top: -10 }]}>
				<TouchableOpacity onPress={closeMoreMenu}>
				<Text style={styles.modalText}>최신순</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={closeMoreMenu}>
				<Text style={styles.modalText}>인기순</Text>
				</TouchableOpacity>
			</View>
			)}
		</View>

		{/* + 버튼 */}
		<TouchableOpacity
			style={styles.floatingButton}
			onPress={() => setIsMenuOpen(!isMenuOpen)}
		>
			<MaterialIcons name="add" size={28} color="white" />
		</TouchableOpacity>
	
		{/* 메뉴 모달 */}
		{isMenuOpen && (
			<Modal transparent={true} animationType="fade">
			<TouchableOpacity
				style={styles.overlay}
				onPress={() => setIsMenuOpen(false)}
			/>
			<View style={styles.menu}>
				<Link href="(subs)/(community)/submit_store" style={styles.menuItem}>
					<Text style={styles.menuText}>매장 제보하기</Text>
				</Link>
				<Link href="(subs)/(community)/shop_review_write" style={styles.menuItem}>
					<Text style={styles.menuText}>매장 리뷰 쓰기</Text>
				</Link>
				<Link href="(subs)/(community)/goods_review_write" style={styles.menuItem}>
					<Text style={styles.menuText}>굿즈 리뷰 쓰기</Text>
				</Link>
			</View>
			</Modal>
		)}
		</View>
	</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 60,
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backIcon: {
    position: "absolute",
    left: 16,
    top: 18,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  section: {
    marginVertical: 1,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  sectionHeader_min: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF9900",
  },
  moreButton: {
    marginTop: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#FF9900",
    borderRadius: 4,
    alignItems: "center",
  },
  cardSeparator: {
    width: 8,
  },
  flatListContainer: {
    paddingBottom: 16,
  },
  modalContainer: {
    position: "absolute",
    top: 45,
    right: 55,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  modalText: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 8,
    color: "#000",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF9900",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menu: {
    position: "absolute",
    bottom: 100,
    right: 20,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 5,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  menuItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    fontSize: 16,
    color: "#000",
  },
});
