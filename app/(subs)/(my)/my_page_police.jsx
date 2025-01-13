import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import colors from "../../../src/styles/color";
import typography from "../../../src/styles/typhography";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { STRINGS } from "../../../src/config/string";
import { SafeAreaView } from "react-native-safe-area-context";
import policies from "./my_policy_list";

export default function TermsPolicyScreen() {
    const [expandedPolicy, setExpandedPolicy] = useState(null); // 펼친 항목의 ID를 관리

    const toggleExpand = (index) => {
        setExpandedPolicy((prev) => (prev === index ? null : index)); // 클릭한 항목의 인덱스를 토글
    };

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
                {policies.map((policy, index) => {
                    const isExpanded = expandedPolicy === index;

                    return (
                        <TouchableOpacity
                            key={index}
                            style={styles.policyItem}
                            onPress={() => toggleExpand(index)}
                        >
                            <View style={styles.iconContainer}>
                                <Text style={styles.iconText}>📄</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.policyTitle}>{policy.TITLE}</Text>
                                <Text style={styles.policyDate}>{policy.DATE}</Text>

                                {/* 펼쳐진 상태에서 내용 표시 */}
                                {isExpanded && (
                                    <Text style={styles.policyContent}>{policy.CONTENT}</Text>
                                )}
                            </View>
                            <View style={styles.arrowContainer}>
                                <MaterialIcons
                                    name={isExpanded ? "expand-less" : "expand-more"}
                                    size={24}
                                    color={colors.gray500}
                                />
                            </View>
                        </TouchableOpacity>
                    );
                })}
                {/* 새로고침 버튼 */}
                <TouchableOpacity style={styles.refreshButton}>
                    <Text style={styles.refreshButtonText}>
                        {STRINGS.MY.TERMS_POLICY.BUTTONS.REFRESH}
                    </Text>
                </TouchableOpacity>
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
    policyItem: {
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
        fontSize: 20,
        color: colors.white,
    },
    textContainer: {
        flex: 1,
    },
    policyTitle: {
        ...typography.body.large_bold,
        color: colors.gray500,
    },
    policyDate: {
        ...typography.label.normal,
        color: colors.gray400,
        marginTop: 5,
    },
    policyContent: {
        ...typography.body.medium,
        color: colors.gray400,
        marginTop: 10,
    },
    arrowContainer: {
        width: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    refreshButton: {
        alignSelf: "center",
        marginTop: 20,
    },
    refreshButtonText: {
        fontSize: 32,
        color: colors.orange300,
    },
});
