import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import colors from "../../../src/styles/color";

export default function BillScreen() {
  const [activeTab, setActiveTab] = useState("매장·포장");

  const allData = [
    {
        id: "1",
        category: "매장·포장",
        date: "12.13 (월)",
        status: "주문 완료",
        place: "서울 역삼점",
        items: "슈븅 2개",
        price: "3,800원",
    },
    {
        id: "2",
        category: "매장·포장",
        date: "12.14 (화)",
        status: "주문 완료",
        place: "서울 역삼점",
        items: "팥붕 외 3개",
        price: "7,800원",
    },
    {
        id: "3",
        category: "매장·포장",
        date: "12.14 (화)",
        status: "주문 완료",
        place: "서울 역삼점",
        items: "팥붕 12개",
        price: "51,800원",
    },
    {
        id: "4",
        category: "매장·포장",
        date: "12.15 (수)",
        status: "주문 완료",
        place: "서울 영등포점",
        items: "슈붕 외 22개",
        price: "32,800원",
    },
    {
        id: "5",
        category: "매장·포장",
        date: "12.17 (금)",
        status: "주문 완료",
        place: "서울 강남점",
        items: "팥붕 외 12개",
        price: "50,800원",
    },
    {
        id: "6",
        category: "굿즈",
        date: "12.15 (수)",
        status: "배송 완료",
        place: "굿즈 배송",
        items: "텀블러 외 1개",
        price: "12,000원",
    },
    {
        id: "7",
        category: "굿즈",
        date: "12.18 (금)",
        status: "배송 완료",
        place: "굿즈 배송",
        items: "종이 외 3개",
        price: "19,000원",
    },
    {
        id: "8",
        category: "굿즈",
        date: "12.17 (목)",
        status: "배송 완료",
        place: "굿즈 배송",
        items: "장난감",
        price: "90,000원",
    },
    {
        id: "9",
        category: "굿즈",
        date: "12.19 (토)",
        status: "배송 완료",
        place: "굿즈 배송",
        items: "보틀",
        price: "30,000원",
    },
    {
        id: "10",
        category: "굿즈",
        date: "12.16 (목)",
        status: "배송 완료",
        place: "굿즈 배송",
        items: "스티커 외 5개",
        price: "18,000원",
    },
  ];

  const filteredData = allData.filter((item) => item.category === activeTab);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.date}>{item.date}</Text>
        <View style={styles.headerRight}>
          <Text style={styles.status}>{item.status}</Text>
          <TouchableOpacity>
            <Text style={styles.detailLink}>주문 상세보기 &gt;</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Image
          source={require("../../../assets/images/goods.png")}
          style={styles.itemImage}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.place}>{item.place}</Text>
          <Text style={styles.items}>{item.items}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>다시 담기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>리뷰 보기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "매장·포장" && styles.activeTab]}
          onPress={() => setActiveTab("매장·포장")}
        >
          <Text style={[styles.tabText, activeTab === "매장·포장" && styles.activeTabText]}>
            매장·포장
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "굿즈" && styles.activeTab]}
          onPress={() => setActiveTab("굿즈")}
        >
          <Text style={[styles.tabText, activeTab === "굿즈" && styles.activeTabText]}>
            굿즈
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.gray500 || "#ddd",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.gray500 || "#ffa500",
  },
  tabText: {
    fontSize: 16,
    color: colors.gray500 || "#666",
  },
  activeTabText: {
    color: colors.gray500 || "#333",
    fontWeight: "bold",
  },
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: colors.gray500 || "#666",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    fontSize: 14,
    color: colors.gray500 || "#333",
    marginRight: 10,
  },
  detailLink: {
    fontSize: 14,
    color: colors.gray500 || "#ffa500",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
  },
  place: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.gray500 || "#333",
    marginBottom: 5,
  },
  items: {
    fontSize: 14,
    color: colors.gray500 || "#666",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: colors.gray500 || "#ffa500",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: colors.gray500 || "#ffa500",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  actionButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
});
