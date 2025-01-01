import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../src/styles/color';
import Typography from '../../../src/styles/typhography';
import { STRINGS } from '../../../src/config/string';

const BoongtamCancel = () => {
    const router = useRouter();

    const handleGoToMain = () => {
        router.push('/boongtamList'); // 메인화면으로 이동
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{STRINGS.BOONG_TAM.ORDER.BOONG_TAM_ORDER_CURRENT}</Text>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <MaterialIcons name="check-circle" size={100} color={Colors.orange100} />
                </View>
                <Text style={styles.message}>
                    {STRINGS.BOONG_TAM.ORDER.CANCEL_MESSAGE1}{'\n'}{STRINGS.BOONG_TAM.ORDER.CANCEL_MESSAGE2}
                </Text>
                <TouchableOpacity style={styles.button} onPress={handleGoToMain}>
                    <Text style={styles.buttonText}>{STRINGS.BOONG_TAM.INFO.GO_MAIN}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray100,
    },
    header: {
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        ...Typography.heading.medium,
        color: Colors.gray500,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    iconContainer: {
        marginBottom: 70,
    },
    message: {
        ...Typography.heading.medium,
        textAlign: 'center',
        color: Colors.gray500,
        marginBottom: 30,
    },
    button: {
        backgroundColor: Colors.orange100,
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
    buttonText: {
        ...Typography.heading.small,
        color: Colors.gray500,
    },
});

export default BoongtamCancel;
