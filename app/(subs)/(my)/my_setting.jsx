import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Switch,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { STRINGS } from "../../../src/config/string";
import colors from "../../../src/styles/color";
import typography from "../../../src/styles/typhography";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
    const router = useRouter();
    const [settings, setSettings] = useState({
        commentNotification: true,
        likeNotification: true,
        marketingNotification: true,
        cookingNotification: true,
        storeOpenNotification: false,
        useSafeNumber: true,
        autoUpdate: true,
        language: "한국어",
    });

    const toggleSwitch = (key) => {
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const updateLanguage = (language) => {
        setSettings((prev) => ({ ...prev, language }));
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            {/* 상단 네비게이션 */}
            <View style={styles.header}>
                {/* Link 컴포넌트로 뒤로 가기 구현 */}
                <TouchableOpacity style={styles.backbutton}
                onPress={()=> router.back()}>
                    <MaterialIcons name="arrow-back" size={24} color={colors.gray500} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{STRINGS.BOONG_TAM.STORE.STORE_INFO}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    {/* 알림 설정 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{STRINGS.MY.SETTINGS.SECTIONS.NOTIFICATIONS}</Text>
                        <View style={styles.row}>
                            <Text style={styles.label}>{STRINGS.MY.SETTINGS.LABELS.COMMENT_NOTIFICATION}</Text>
                            <Switch
                                value={settings.commentNotification}
                                onValueChange={() => toggleSwitch("commentNotification")}
                                trackColor={{ true: colors.orange100, false: colors.gray300 }}
                                thumbColor={settings.commentNotification ? colors.white : colors.gray500}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>{STRINGS.MY.SETTINGS.LABELS.LIKE_NOTIFICATION}</Text>
                            <Switch
                                value={settings.likeNotification}
                                onValueChange={() => toggleSwitch("likeNotification")}
                                trackColor={{ true: colors.orange100, false: colors.gray300 }}
                                thumbColor={settings.likeNotification ? colors.white : colors.gray500}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>{STRINGS.MY.SETTINGS.LABELS.MARKETING_NOTIFICATION}</Text>
                            <Switch
                                value={settings.marketingNotification}
                                onValueChange={() => toggleSwitch("marketingNotification")}
                                trackColor={{ true: colors.orange100, false: colors.gray300 }}
                                thumbColor={settings.marketingNotification ? colors.white : colors.gray500}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>{STRINGS.MY.SETTINGS.LABELS.COOKING_NOTIFICATION}</Text>
                            <Switch
                                value={settings.cookingNotification}
                                onValueChange={() => toggleSwitch("cookingNotification")}
                                trackColor={{ true: colors.orange100, false: colors.gray300 }}
                                thumbColor={settings.cookingNotification ? colors.white : colors.gray500}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>{STRINGS.MY.SETTINGS.LABELS.STORE_OPEN_NOTIFICATION}</Text>
                            <Switch
                                value={settings.storeOpenNotification}
                                onValueChange={() => toggleSwitch("storeOpenNotification")}
                                trackColor={{ true: colors.orange100, false: colors.gray300 }}
                                thumbColor={settings.storeOpenNotification ? colors.white : colors.gray500}
                            />
                        </View>
                    </View>

                    {/* 기능 설정 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{STRINGS.MY.SETTINGS.SECTIONS.FEATURES}</Text>
                        <View style={styles.row}>
                            <Text style={styles.label}>{STRINGS.MY.SETTINGS.LABELS.USE_SAFE_NUMBER}</Text>
                            <Switch
                                value={settings.useSafeNumber}
                                onValueChange={() => toggleSwitch("useSafeNumber")}
                                trackColor={{ true: colors.orange100, false: colors.gray300 }}
                                thumbColor={settings.useSafeNumber ? colors.white : colors.gray500}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>{STRINGS.MY.SETTINGS.LABELS.AUTO_UPDATE}</Text>
                            <Switch
                                value={settings.autoUpdate}
                                onValueChange={() => toggleSwitch("autoUpdate")}
                                trackColor={{ true: colors.orange100, false: colors.gray300 }}
                                thumbColor={settings.autoUpdate ? colors.white : colors.gray500}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>{STRINGS.MY.SETTINGS.LABELS.LANGUAGE}</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={settings.language}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => updateLanguage(itemValue)}
                                >
                                    <Picker.Item label="한국어" value="한국어" />
                                    <Picker.Item label="English" value="English" />
                                    <Picker.Item label="日本語" value="日本語" />
                                </Picker>
                            </View>
                        </View>
                    </View>

                    {/* 저장 버튼 */}
                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>{STRINGS.MY.SETTINGS.BUTTONS.SAVE}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: colors.gray100,
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: colors.gray100,
        padding: 20,
    },
    header: {
        height: 50,
        backgroundColor: colors.orange100,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    backbutton: {
        position: "absolute",
        left: 10,
    },
    headerTitle: {
        ...typography.heading.medium,
        color: colors.gray500,
        textAlign: 'center',
    },
    container: {
        flex: 1,
    },
    section: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: colors.gray500,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    sectionTitle: {
        ...typography.heading.small,
        marginBottom: 10,
        color: colors.gray500,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    label: {
        ...typography.body.large,
        color: colors.gray500,
    },
    pickerContainer: {
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.gray500,
        borderRadius: 10,
        backgroundColor: colors.white,
        overflow: "hidden",
        paddingHorizontal: 5,
    },
    picker: {
        minWidth: 145,
        fontSize: 16,
        color: colors.gray500,
    },
    saveButton: {
        backgroundColor: colors.orange100,
        paddingVertical: 15,
        alignItems: "center",
        borderRadius: 30,
        marginBottom: 30,
    },
    saveButtonText: {
        ...typography.body.large_bold,
        color: colors.white,
    },
});
