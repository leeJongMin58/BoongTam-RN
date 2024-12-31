import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // MaterialIcons 추가
import colors from '../../../src/styles/color';
import { useCart } from '../../../src/services/CartContext';
import { Link } from 'expo-router';
import typography from '../../../src/styles/typhography';
import { STRINGS } from '../../../src/config/string'

export default function CartScreen({ navigation }) {
    const { cart, removeFromCart, updateQuantity } = useCart();

    const [selectedItems, setSelectedItems] = React.useState([]);

    const toggleSelectItem = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
        } else {
            setSelectedItems((prev) => [...prev, id]);
        }
    };

    const calculateTotal = () => {
        return cart
            .filter((item) => selectedItems.includes(item.id))
            .reduce((sum, item) => sum + parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity, 0);
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            {/* 체크박스 */}
            <TouchableOpacity onPress={() => toggleSelectItem(item.id)}>
                <MaterialIcons
                    name={selectedItems.includes(item.id) ? 'check-box' : 'check-box-outline-blank'}
                    size={24}
                    color={colors.orange200}
                />
            </TouchableOpacity>

            {/* 상품 이미지 */}
            <Image source={item.image} style={styles.cartImage} />

            {/* 상품 세부정보 */}
            <View style={styles.cartDetails}>
                <Text style={styles.cartName}>{item.name}</Text>
                <Text style={styles.cartPrice}>{item.price}</Text>

                {/* 수량 변경 버튼 */}
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

            {/* 삭제 버튼 */}
            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <MaterialIcons name="close" size={24} color={colors.red500} />
            </TouchableOpacity>
        </View>
    );

    const handleCheckout = () => {
        if (selectedItems.length === 0) {
            Alert.alert('알림', '결제할 상품을 선택해주세요.');
            return;
        }

        const itemsToPurchase = cart.filter((item) => selectedItems.includes(item.id));
        navigation.navigate('Application', { items: itemsToPurchase });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={cart}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.cartList}
            />

            {/* 총 결제 금액 표시 */}
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>{STRINGS.SHOP.PRODUCT_CART.TOTAL_CALCUL.TOTAL}: {calculateTotal()}{STRINGS.SHOP.PRODUCT_CART.TOTAL_CALCUL.COUNT}</Text>
            </View>

            {/* 결제 버튼 */}
            <View style={styles.checkoutButtonWrapper}>
                <Link
                    href={{
                        pathname: '/(subs)/(pay)/pay',
                        params: {
                            selectedItems: JSON.stringify(
                                selectedItems.map((id) => cart.find((item) => item.id === id))
                            ),
                        },
                    }}
                    style={styles.checkoutButton}
                >
                    <Text style={styles.checkoutText}>{STRINGS.SHOP.PRODUCT_CART.CHECKOUT_TEXT}</Text>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray200,
    },
    cartList: {
        padding: 10,
        marginTop: 30,
    },
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
    cartImage: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        marginRight: 10,
        backgroundColor: colors.gray200,
        borderRadius: 8,
    },
    cartDetails: {
        flex: 1,
        justifyContent: 'space-between',
    },
    cartName: {
        ...typography.body.large_bold,
        color: colors.gray500,
        marginBottom: 5,
    },
    cartPrice: {
        ...typography.body.large,
        color: colors.orange200,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    quantity: {
        ...typography.body.large_bold,
        marginHorizontal: 10,
    },
    totalContainer: {
        padding: 16,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.gray300,
        alignItems: 'center',
    },
    totalText: {
        ...typography.heading.small_bold,
        color: colors.gray500,
        marginBottom: 10,
    },
    checkoutButtonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    checkoutButton: {
        backgroundColor: colors.orange300,
        paddingVertical: 15,
        paddingHorizontal: 140,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkoutText: {
        ...typography.body.large_bold,
        color: colors.white,
    },
});
