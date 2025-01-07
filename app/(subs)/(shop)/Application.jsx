import React, { useState, useRef } from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, Link, useRouter } from 'expo-router';
import colors from '../../../src/styles/color';
import typography from '../../../src/styles/typhography';
import { STRINGS } from '../../../src/config/string';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Application = () => {
    const { items } = useLocalSearchParams();
    const router = useRouter();
    const scrollViewRef = useRef(null);

    const parsedItems = items ? JSON.parse(items) : [];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView ref={scrollViewRef}>
                {/* 상단 네비게이션 */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backbutton}
                    onPress={()=> router.back()}>
                        <MaterialIcons name="arrow-back" size={24} color={colors.gray500} />
                    </TouchableOpacity>

                    <Link href="(subs)/(my)/my_setting" style={styles.settingsButton}>
                        <MaterialIcons name="settings" size={24} color={colors.gray500} />
                    </Link>
                </View>

                {/* Product Card */}
                {parsedItems.map((item, index) => (
                    <View key={index} style={styles.cardContainer}>
                        <View style={styles.cardHeader}>                        
                            <Image source={item.image} style={styles.productImage} />
                            <View style={styles.productDetails}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.productPrice}>{item.price}</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.orderDetails}>{STRINGS.SHOP.APPLICATION.APPLY_ORDER_VIEW}</Text>
                            </TouchableOpacity>
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray200,
    },
    header: {
        height: 50,
        backgroundColor: colors.orange100,
        alignItems: "center",
        justifyContent: "center",
    },
    backbutton: {
        position: "absolute",
        left: 10,
    },
    settingsButton: {
        position: "absolute",
        right: 10,
    },
    headerTitle: {
        ...typography.heading.medium,
        color: colors.gray500,
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
