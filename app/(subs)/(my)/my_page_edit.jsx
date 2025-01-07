import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors from "../../../src/styles/color";
import typography from "../../../src/styles/typhography";
import { STRINGS } from "../../../src/config/string";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserInfoScreen() {
    const router = useRouter();
    const userInfo = STRINGS.MY.info.userDetails;

    const handleLogout = () => {
        Alert.alert(STRINGS.MY.info.logoutTitle, STRINGS.MY.info.logoutMessage, [
            { text: STRINGS.MY.info.confirm, onPress: () => console.log("Logout confirmed") },
        ]);
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

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.profileContainer}>
                    <MaterialIcons
                        name="account-circle"
                        size={100}
                        color={colors.gray300}
                        style={styles.profileImage}
                    />
                    <Text style={styles.userName}>{`${STRINGS.MY.info.userId}: 붕탐`}</Text>
                </View>
                <View style={styles.infoContainer}>
                    {userInfo.map((item, index) => (
                        <View key={index} style={styles.infoItem}>
                            <View style={styles.iconContainer}>
                                <MaterialIcons name={item.icon} size={20} color={colors.white} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.infoLabel}>{item.label}</Text>
                                <Text style={styles.infoValue}>{item.value}</Text>
                            </View>
                            <Link
                                href={{
                                    pathname: "/my_page_change",
                                    params: { label: item.label, value: item.value },
                                }}
                                asChild
                            >
                                <TouchableOpacity style={styles.editButton}>
                                    <Text style={styles.editButtonText}>
                                        {STRINGS.MY.info.edit}
                                    </Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    ))}
                </View>
                <View style={styles.bottomButtons}>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutButtonText}>{STRINGS.MY.info.logout}</Text>
                    </TouchableOpacity>
                    <Link href="/my_page_withdrawal" asChild>
                        <TouchableOpacity style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>{STRINGS.MY.info.withdrawal}</Text>
                        </TouchableOpacity>
                    </Link>
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
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: colors.gray100,
        padding: 20,
    },
    profileContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
    profileImage: {
        marginBottom: 10,
    },
    userName: {
        ...typography.heading.small,
        color: colors.gray500,
    },
    infoContainer: {
        marginBottom: 30,
    },
    infoItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        shadowColor: colors.black,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.gray500,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    infoLabel: {
        ...typography.label.large,
        color: colors.gray500,
    },
    infoValue: {
        ...typography.body.medium,
        color: colors.gray400,
    },
    editButton: {
        backgroundColor: colors.orange100,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    editButtonText: {
        ...typography.label.large,
        color: colors.white,
    },
    bottomButtons: {
        marginTop: 20,
    },
    logoutButton: {
        backgroundColor: colors.gray500,
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: "center",
        marginBottom: 10,
    },
    logoutButtonText: {
        ...typography.body.large,
        color: colors.white,
    },
    deleteButton: {
        backgroundColor: colors.orange100,
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: "center",
    },
    deleteButtonText: {
        ...typography.body.large,
        color: colors.white,
    },
});
