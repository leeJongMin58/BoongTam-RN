import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Link } from "expo-router";
import colors from "../../../src/styles/color";
import typography from "../../../src/styles/typhography";
import { STRINGS } from "../../../src/config/string";

export default function TermsPolicyScreen() {
    const policies = STRINGS.MY.TERMS_POLICY.POLICIES;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {policies.map((policy, index) => (
                <Link key={index} href={`/policy/${index}`} asChild>
                    <TouchableOpacity style={styles.policyItem}>
                        <View style={styles.iconContainer}>
                            <Text style={styles.iconText}>📄</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.policyTitle}>{policy.TITLE}</Text>
                            <Text style={styles.policyDate}>{policy.DATE}</Text>
                        </View>
                        <View style={styles.arrowContainer}>
                            <Text style={styles.arrowText}>➔</Text>
                        </View>
                    </TouchableOpacity>
                </Link>
            ))}
            {/* 새로고침 버튼 */}
            <TouchableOpacity style={styles.refreshButton}>
                <Text style={styles.refreshButtonText}>{STRINGS.MY.TERMS_POLICY.BUTTONS.REFRESH}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
    arrowContainer: {
        width: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    arrowText: {
        fontSize: 20,
        color: colors.gray500,
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
