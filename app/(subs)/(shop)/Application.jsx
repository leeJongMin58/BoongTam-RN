import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import colors from '../../../src/styles/color';
import typography from '../../../src/styles/typhography';
import { STRINGS } from '../../../src/config/string'

const Application = ({ navigation }) => {
    const { items } = useLocalSearchParams();

    const parsedItems = items ? JSON.parse(items) : [];

    const handleExchange = () => {
        alert([STRINGS.SHOP.APPLICATION.APPLY_CHANGE_ALERT]);
    };

    const handleReturn = () => {
        alert([STRINGS.SHOP.APPLICATION.APPLY_RETURN_ALERT]);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>{STRINGS.SHOP.APPLICATION.APLLY_HEADER_TITLE}</Text>
                <TouchableOpacity style={styles.headerButton}>
                    <Text style={styles.headerButtonText}>{STRINGS.SHOP.APPLICATION.APPLY_CHANGE_BUTTON}</Text>
                </TouchableOpacity>
            </View>

            {/* Product Card */}
            {parsedItems.map((item, index) => (
                <View key={index} style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                        <TouchableOpacity>
                            <Text style={styles.orderDetails}>{STRINGS.SHOP.APPLICATION.APPLY_ORDER_VIEW}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.productContainer}>
                        <Image source={item.image} style={styles.productImage} />
                        <View style={styles.productDetails}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.productPrice}>{item.price}</Text>
                        </View>
                    </View>
                </View>
            ))}

            {/* Buttons */}
            <View style={styles.buttonContainerCentered}>
                <Link
                    href={{
                        pathname: '(subs)/(shop)/change_screen',
                        params: {
                            items: JSON.stringify(parsedItems),
                        },
                    }}
                    style={styles.actionButton}
                >
                    <Text style={styles.actionButtonText}>{STRINGS.SHOP.APPLICATION.APPLY_CHANGE_TEXT}</Text>
                </Link>
                <Link
                    href={{
                        pathname: '(subs)/(shop)/return_screen',
                        params: {
                            items: JSON.stringify(parsedItems),
                        },
                    }}
                    style={styles.actionButton}
                >
                    <Text style={styles.actionButtonText}>{STRINGS.SHOP.APPLICATION.APPLY_RETURN_TEXT}</Text>
                </Link>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray200,
    },
    headerContainer: {
        alignItems: 'center',
        padding: 16,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray200,
    },
    headerTitle: {
        ...typography.heading.medium,
        color: colors.gray500,
        marginBottom: 8,
    },
    headerButton: {
        backgroundColor: colors.orange300,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    headerButtonText: {
        ...typography.body.large_bold,
        color: colors.white,
    },
    cardContainer: {
        margin: 10,
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 16,
        shadowColor: colors.gray300,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 16,
    },
    orderDetails: {
        ...typography.body.medium,
        color: colors.blue100,
        fontWeight: 'bold',
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
        backgroundColor: colors.gray200,
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        ...typography.body.large_bold,
        color: colors.gray500,
        marginBottom: 4,
    },
    productPrice: {
        ...typography.body.medium,
        color: colors.red100,
        fontWeight: 'bold',
    },
    buttonContainerCentered: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 16,
    },
    actionButton: {
        flex: 1,
        backgroundColor: colors.orange300,
        paddingVertical: 12,
        marginHorizontal: 8,
        textAlign: 'center',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonText: {
        ...typography.body.large_bold,
        color: colors.white,
    },
});


export default Application;
