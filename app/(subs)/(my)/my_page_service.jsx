import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Link } from "expo-router";
import colors from "../../../src/styles/color";
import typography from "../../../src/styles/typhography";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { STRINGS } from "../../../src/config/string";

export default function CustomerServiceScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {STRINGS.MY.CUSTOMER_SERVICE_SCREEN.OPTIONS.map((option, index) => (
                <Link key={index} href={`/service/${index}`} asChild>
                    <TouchableOpacity style={styles.optionContainer}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons name={option.icon} style={styles.iconText} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.optionTitle}>{option.title}</Text>
                            <Text style={styles.optionDescription}>{option.description}</Text>
                        </View>
                    </TouchableOpacity>
                </Link>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
