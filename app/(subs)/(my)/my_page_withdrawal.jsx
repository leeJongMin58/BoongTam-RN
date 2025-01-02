import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import { Link } from "expo-router";
import colors from "../../../src/styles/color";
import typography from "../../../src/styles/typhography";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { STRINGS } from "../../../src/config/string";

export default function WithdrawalScreen() {
    const [checked, setChecked] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleWithdrawal = () => {
        if (!checked) {
            Alert.alert(
                STRINGS.MY.WITHDRAWAL_SCREEN.ALERTS.WARNING_TITLE,
                STRINGS.MY.WITHDRAWAL_SCREEN.ALERTS.WARNING_MESSAGE
            );
            return;
        }
        Alert.alert(
            STRINGS.MY.WITHDRAWAL_SCREEN.ALERTS.SUCCESS_TITLE,
            STRINGS.MY.WITHDRAWAL_SCREEN.ALERTS.SUCCESS_MESSAGE
        );
    };

    const toggleChecked = () => {
        setChecked((prev) => !prev);
    };

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* 유의사항 섹션 */}
            <View style={styles.noticeSection}>
                <View style={styles.noticeHeader}>
                    <Text style={styles.noticeTitle}>
                        {STRINGS.MY.WITHDRAWAL_SCREEN.NOTICE.TITLE}
                    </Text>
                    <View style={styles.noticeBadge}>
                        <Text style={styles.noticeBadgeText}>
                            {STRINGS.MY.WITHDRAWAL_SCREEN.NOTICE.BADGE}
                        </Text>
                    </View>
                </View>
                <Text style={styles.noticeDescription}>
                    {STRINGS.MY.WITHDRAWAL_SCREEN.NOTICE.DESCRIPTION}
                </Text>
                <TouchableOpacity onPress={toggleChecked}>
                    <View style={styles.checkContainer}>
                        <Text style={styles.checkIcon}>
                            {checked ? (
                                <MaterialIcons
                                    name="check-box"
                                    size={24}
                                    color={colors.orange300}
                                />
                            ) : (
                                <MaterialIcons
                                    name="check-box-outline-blank"
                                    size={24}
                                    color={colors.gray500}
                                />
                            )}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* 화살표 섹션 */}
            <TouchableOpacity onPress={toggleExpand} style={styles.arrowContainer}>
                <MaterialIcons
                    name={isExpanded ? "expand-less" : "expand-more"}
                    size={30}
                    color={colors.gray500}
                />
            </TouchableOpacity>
            {isExpanded && (
                <View style={styles.expandedSection}>
                    <Text style={styles.expandedText}>
                        {STRINGS.MY.WITHDRAWAL_SCREEN.NOTICE.EXPANDED_TEXT}
                    </Text>
                </View>
            )}

            {/* 하단 확인 문구 */}
            <View style={styles.confirmSection}>
                <Text style={styles.confirmText}>
                    {STRINGS.MY.WITHDRAWAL_SCREEN.CONFIRMATION}
                </Text>
            </View>

            {/* 탈퇴 버튼 */}
            <TouchableOpacity
                style={styles.withdrawalButton}
                onPress={handleWithdrawal}
            >
                <Text style={styles.withdrawalButtonText}>
                    {STRINGS.MY.WITHDRAWAL_SCREEN.BUTTON}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.gray100,
        padding: 20,
        alignItems: "center",
    },
    noticeSection: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        width: "100%",
        shadowColor: colors.gray500,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    noticeHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    noticeTitle: {
        ...typography.body.large_bold,
        color: colors.gray500,
    },
    noticeBadge: {
        backgroundColor: colors.orange300,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    noticeBadgeText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: "bold",
    },
    noticeDescription: {
        ...typography.body.medium,
        color: colors.gray400,
        marginBottom: 15,
    },
    checkContainer: {
        alignItems: "flex-end",
    },
    arrowContainer: {
        marginBottom: 20,
    },
    expandedSection: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        width: "100%",
        shadowColor: colors.gray500,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    expandedText: {
        ...typography.body.medium,
        color: colors.gray400,
    },
    confirmSection: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        width: "100%",
        alignItems: "center",
        shadowColor: colors.gray500,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    confirmText: {
        ...typography.body.medium,
        textAlign: "center",
        color: colors.gray400,
    },
    withdrawalButton: {
        backgroundColor: colors.orange300,
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 80,
        alignItems: "center",
    },
    withdrawalButtonText: {
        ...typography.body.large_bold,
        color: colors.white,
    },
});
