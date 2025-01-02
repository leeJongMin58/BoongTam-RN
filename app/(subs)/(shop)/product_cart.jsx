import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../src/styles/color';
import { useCart } from '../../../src/services/CartContext';
import { useRouter } from 'expo-router';
import typography from '../../../src/styles/typhography';
import { STRINGS } from '../../../src/config/string';

export default function CartScreen() {
    const router = useRouter();
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const [selectedItems, setSelectedItems] = React.useState([]);

    useEffect(() => {
        // 장바구니 항목이 변경되면 선택된 항목도 초기화
        setSelectedItems(cart.map((item) => item.id));
    }, [cart]);

    const toggleSelectItem = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
        );
    };

    const calculateTotal = () => {
        return cart
            .filter((item) => selectedItems.includes(item.id))
            .reduce((sum, item) => sum + parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity, 0);
    };

    const handleCheckout = async () => {
        if (selectedItems.length === 0) {
            Alert.alert('알림', '결제할 상품을 선택해주세요.');
            return;
        }

        const itemsToPurchase = cart.filter((item) => selectedItems.includes(item.id));

        console.log('선택된 아이템:', selectedItems);
        console.log('결제할 상품:', cart.filter((item) => selectedItems.includes(item.id)));

        try {
            await clearCart(); // 장바구니 초기화
            setSelectedItems([]); // 선택된 항목 초기화
            router.push({
                pathname: '/(subs)/(shop)/shopOrder',
                params: {
                    selectedItems: JSON.stringify(itemsToPurchase),
                },
            });
        } catch (error) {
            console.error('Checkout Error:', error);
            Alert.alert('오류', '결제 처리 중 문제가 발생했습니다.');
        }
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <TouchableOpacity onPress={() => toggleSelectItem(item.id)}>
                <MaterialIcons
                    name={selectedItems.includes(item.id) ? 'check-box' : 'check-box-outline-blank'}
                    size={24}
                    color={colors.orange200}
                />
            </TouchableOpacity>
            <Image source={item.image} style={styles.cartImage} />
            <View style={styles.cartDetails}>
                <Text style={styles.cartName}>{item.name}</Text>
                <Text style={styles.cartPrice}>{item.price}</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)}>
                        <MaterialIcons name="remove" size={20} color={colors.gray500} />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                        <MaterialIcons name="add" size={20} color={colors.gray500} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <MaterialIcons name="close" size={24} color={colors.gray500} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={cart}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.cartList}
            />
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>
                    {STRINGS.SHOP.PRODUCT_CART.TOTAL_CALCUL.TOTAL}: {calculateTotal()}
                    {STRINGS.SHOP.PRODUCT_CART.TOTAL_CALCUL.COUNT}
                </Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                <Text style={styles.checkoutText}>{STRINGS.SHOP.PRODUCT_CART.CHECKOUT_TEXT}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.gray200 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { ...typography.body.large_bold, color: colors.gray500, marginBottom: 20 },
    shopButton: { backgroundColor: colors.orange300, padding: 15, borderRadius: 10 },
    shopButtonText: { ...typography.body.large_bold, color: colors.white },
    cartList: { padding: 10, marginTop: 30 },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        marginTop: 5,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        elevation: 2,
    },
    cartImage: { width: 70, height: 70, resizeMode: 'contain', marginRight: 10 },
    cartDetails: { flex: 1, justifyContent: 'space-between' },
    cartName: { ...typography.body.large_bold, color: colors.gray500, marginBottom: 5 },
    cartPrice: { ...typography.body.large, color: colors.orange200 },
    quantityContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    quantity: { ...typography.body.large_bold, marginHorizontal: 10 },
    totalContainer: {
        padding: 16,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.gray300,
        alignItems: 'center',
    },
    totalText: { ...typography.heading.small_bold, color: colors.gray500, marginBottom: 10 },
    checkoutButton: {
        backgroundColor: colors.orange300,
        paddingVertical: 15,
        paddingHorizontal: 140,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    checkoutText: { ...typography.body.large_bold, color: colors.white },
});
