import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Link } from "expo-router";
import colors from "../../../src/styles/color";
import typography from "../../../src/styles/typhography";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import option from "./my_option_list"; // 옵션 데이터 가져오기

export default function CustomerServiceScreen() {
    return (
        <SafeAreaView style={styles.safeContainer}>
            {/* 상단 네비게이션 */}
            <View style={styles.header}>
                {/* 뒤로 가기 버튼 */}
                <Link href="(tabs)/(my)/my" style={styles.backbutton}>
                    <MaterialIcons name="arrow-back" size={24} color={colors.gray500} />
                </Link>

                {/* 설정 버튼 */}
                <Link href="(subs)/(my)/my_setting" style={styles.settingsButton}>
                    <MaterialIcons name="settings" size={24} color={colors.gray500} />
                </Link>
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                {option.map((opt, index) => {
                    // FAQ 옵션만 Link로 처리
                    if (opt.title === "FAQ") {
                        return (
                            <Link key={index} href="(subs)/(my)/my_QNA" style={styles.optionContainer}>
                                <View style={styles.iconContainer}>
                                    <MaterialIcons name={opt.icon} style={styles.iconText} />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.optionTitle}>{opt.title}</Text>
                                    <Text style={styles.optionDescription}>{opt.description}</Text>
                                </View>
                            </Link>
                        );
                    }

                    // 다른 옵션은 TouchableOpacity 유지
                    return (
                        <TouchableOpacity
                            key={index}
                            style={styles.optionContainer}
                            onPress={() => alert(opt.alertMessage || "해당 서비스를 이용하시려면 고객센터에 문의해주세요.")}
                        >
                            <View style={styles.iconContainer}>
                                <MaterialIcons name={opt.icon} style={styles.iconText} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.optionTitle}>{opt.title}</Text>
                                <Text style={styles.optionDescription}>{opt.description}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: colors.gray100,
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
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: colors.gray100,
    },
    optionContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        shadowColor: colors.gray500,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.orange200,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    iconText: {
        fontSize: 24,
        color: colors.white,
    },
    textContainer: {
        flex: 1,
    },
    optionTitle: {
        ...typography.body.large_bold,
        color: colors.gray500,
    },
    optionDescription: {
        ...typography.body.medium,
        color: colors.gray400,
        marginTop: 5,
    },
});
