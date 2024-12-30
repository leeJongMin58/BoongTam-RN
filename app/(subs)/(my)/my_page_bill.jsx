import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
} from "react-native";
import { Link } from "expo-router";
import colors from "../../../src/styles/color";
import typography from "../../../src/styles/typhography";
import { STRINGS } from "../../../src/config/string";

export default function BillScreen() {
    const [activeTab, setActiveTab] = useState(STRINGS.MY.bill.TABS.STORE);

    const allData = STRINGS.MY.bill.allData;

    const filteredData = allData.filter(
        (item) => item.category === activeTab
    );

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.date}>{item.date}</Text>
                <View style={styles.headerRight}>
                    <Text style={styles.status}>{item.status}</Text>
                    <Link href={`/order/${item.id}`} asChild>
                        <TouchableOpacity>
                            <Text style={styles.detailLink}>{STRINGS.MY.bill.DETAIL_LINK}</Text>
                        </TouchableOpacity>
                    </Link>
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
                    <Text style={styles.actionButtonText}>
                        {STRINGS.MY.bill.ACTION_BUTTONS.ADD_AGAIN}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>
                        {STRINGS.MY.bill.ACTION_BUTTONS.VIEW_REVIEW}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === STRINGS.MY.bill.TABS.STORE && styles.activeTab]}
                    onPress={() => setActiveTab(STRINGS.MY.bill.TABS.STORE)}
                >
                    <Text
                        style={[styles.tabText, activeTab === STRINGS.MY.bill.TABS.STORE && styles.activeTabText]}
                    >
                        {STRINGS.MY.bill.TABS.STORE}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === STRINGS.MY.bill.TABS.GOODS && styles.activeTab]}
                    onPress={() => setActiveTab(STRINGS.MY.bill.TABS.GOODS)}
                >
                    <Text
                        style={[styles.tabText, activeTab === STRINGS.MY.bill.TABS.GOODS && styles.activeTabText]}
                    >
                        {STRINGS.MY.bill.TABS.GOODS}
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
        backgroundColor: colors.gray200,
    },
    tabs: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: colors.gray300,
    },
    tab: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 10,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: colors.orange200,
    },
    tabText: {
        ...typography.body.medium,
        color: colors.gray500,
    },
    activeTabText: {
        ...typography.body.large_bold,
        color: colors.orange300,
    },
    listContainer: {
        padding: 15,
    },
    card: {
        backgroundColor: colors.gray100,
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: colors.gray500,
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
        ...typography.body.medium,
    },
    headerRight: {
        flexDirection: "row",
        alignItems: "center",
    },
    status: {
        ...typography.body.medium,
        marginRight: 10,
    },
    detailLink: {
        ...typography.body.large_bold,
        color: colors.orange300,
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
        ...typography.heading.small,
        marginBottom: 5,
    },
    items: {
        ...typography.body.medium,
        marginBottom: 5,
    },
    price: {
        ...typography.body.large_bold,
        color: colors.orange200,
    },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
    actionButton: {
        backgroundColor: colors.orange100,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    actionButtonText: {
        ...typography.body.large_bold,
        color: colors.white,
    },
});
