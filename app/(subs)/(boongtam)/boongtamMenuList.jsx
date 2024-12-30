import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../src/styles/color';
import Typography from '../../../src/styles/typhography';
import { STRINGS } from '../../../src/config/string';

const BoongtamMenuList = () => {
    const router = useRouter();
    const { orderItems } = useLocalSearchParams();

    // 샘플 메뉴 데이터
    const menuData = [
        { id: 1, name: '슈크림 붕어빵', price: 500, image: 'https://via.placeholder.com/80', quantity: 0 },
        { id: 2, name: '팥 붕어빵', price: 500, image: 'https://via.placeholder.com/80', quantity: 0 },
        { id: 3, name: '피자 붕어빵', price: 1000, image: 'https://via.placeholder.com/80', quantity: 0 },
        { id: 4, name: '초콜릿 붕어빵', price: 1000, image: 'https://via.placeholder.com/80', quantity: 0 },
    ];

    const [menuItems, setMenuItems] = useState(menuData);

    useEffect(() => {
        // 이전 주문 아이템을 반영하여 초기화
        if (orderItems) {
            const parsedItems = JSON.parse(orderItems);
            const updatedMenu = menuData.map((item) => {
                const existingItem = parsedItems.find((orderItem) => orderItem.id === item.id);
                return existingItem ? { ...item, quantity: existingItem.quantity } : item;
            });
            setMenuItems(updatedMenu);
        }
    }, [orderItems]);

    // 총 금액 계산
    const calculateTotal = () => {
        return menuItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // 수량 증가
    const handleIncrease = (id) => {
        setMenuItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // 수량 감소
    const handleDecrease = (id) => {
        setMenuItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };

    const handleOrderButtonClick = () => {
        const selectedItems = menuItems.filter((item) => item.quantity > 0);

        router.push({
            pathname: '/boongtamOrder',
            params: {
                orderItems: JSON.stringify(selectedItems), // 선택된 아이템을 JSON으로 전달
            },
        });
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardPrice}>{item.price.toLocaleString()}원 / 1개</Text>
            </View>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => handleDecrease(item.id)} style={styles.quantityButton}>
                    <MaterialIcons name="remove" size={24} color={Colors.orange100} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => handleIncrease(item.id)} style={styles.quantityButton}>
                    <MaterialIcons name="add" size={24} color={Colors.orange100} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* 상단 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/(subs)/(boongtam)/boongtamDetail')} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color={Colors.gray500} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{STRINGS.BOONG_TAM.ORDER.BOONG_TAM_ORDER}</Text>
            </View>

            {/* 메뉴 리스트 */}
            <FlatList
                data={menuItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />

            {/* 주문하기 버튼 */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.orderButton} onPress={handleOrderButtonClick}>
                    <Text style={styles.orderButtonText}>
                        {calculateTotal().toLocaleString()}{STRINGS.BOONG_TAM.PAY.WON} {STRINGS.BOONG_TAM.ORDER.ORDER}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.gray100 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray200,
        position: 'relative',
    },
    backButton: { position: 'absolute', left: 10 },
    headerTitle: {
        ...Typography.heading.small_bold,
        color: Colors.gray500,
        textAlign: 'center'
    },
    listContainer: { padding: 15 },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 10,
        marginBottom: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: Colors.gray200,
    },
    image: { width: 60, height: 60, borderRadius: 10 },
    cardContent: { flex: 1, marginLeft: 15 },
    cardTitle: { ...Typography.label.large },
    cardPrice: { ...Typography.label.normal, color: Colors.gray500, marginTop: 5 },
    quantityContainer: { flexDirection: 'row', alignItems: 'center' },
    quantityButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.orange100,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    quantityText: { ...Typography.body.large_bold, marginLeft:5, marginRight:5 },
    footer: { padding: 15, backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.gray200 },
    orderButton: { backgroundColor: Colors.orange100, borderRadius: 10, paddingVertical: 15, alignItems: 'center' },
    orderButtonText: { ...Typography.heading.medium, color: Colors.white },
});

export default BoongtamMenuList;
