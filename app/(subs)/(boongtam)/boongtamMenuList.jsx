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
        { id: 1, name: '슈크림 붕어빵', price: 500, image: 'data:image/webp;base64,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', quantity: 0 },
        { id: 2, name: '팥 붕어빵', price: 500, image: 'data:image/webp;base64,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', quantity: 0 },
        { id: 3, name: '피자 붕어빵', price: 1000, image: 'https://via.placeholder.com/8data:image/webp;base64,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', quantity: 0 },
        { id: 4, name: '초콜릿 붕어빵', price: 1000, image: 'data:image/webp;base64,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', quantity: 0 },
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
