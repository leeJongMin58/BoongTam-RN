import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { STRINGS } from "../../../src/config/string";
import colors from "../../../src/styles/color";
import typography from "../../../src/styles/typhography";

export default function EditProfile() {
    const router = useRouter();
    const { params } = router;
    const { label = "기본값", value = "" } = params || {};

    const [inputValue, setInputValue] = useState(value);

    const handleSave = () => {
        if (inputValue.trim() === "") {
            Alert.alert(STRINGS.MY.EDIT_PROFILE.ALERT_ERROR);
        } else {
            Alert.alert(
                STRINGS.MY.EDIT_PROFILE.ALERT_SUCCESS
                    .replace("{label}", label)
                    .replace("{value}", inputValue)
            );
            router.push("/my_page_edit");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{STRINGS.MY.EDIT_PROFILE.TITLE}</Text>
            <Text style={styles.description}>
                {STRINGS.MY.EDIT_PROFILE.DESCRIPTION.replace("{label}", label).replace("{value}", value)}
            </Text>
            <TextInput
                style={styles.input}
                value={inputValue}
                onChangeText={setInputValue}
                placeholder={STRINGS.MY.EDIT_PROFILE.PLACEHOLDER.replace("{label}", label)}
            />
            <TouchableOpacity
                onPress={handleSave}
                style={[styles.button, inputValue.trim() === value.trim() && styles.buttonDisabled]}
                disabled={inputValue.trim() === value.trim()}
            >
                <Text style={styles.buttonText}>{STRINGS.MY.EDIT_PROFILE.BUTTON_SAVE}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.gray100,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        ...typography.heading.medium,
        marginBottom: 10,
    },
    description: {
        ...typography.body.medium,
        color: colors.gray400,
        marginBottom: 10,
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: colors.gray500,
        borderRadius: 5,
        marginBottom: 20,
        ...typography.body.large,
    },
    button: {
        backgroundColor: colors.orange200,
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    buttonDisabled: {
        backgroundColor: colors.gray300,
    },
    buttonText: {
        ...typography.body.large_bold,
        color: colors.white,
    },
});
