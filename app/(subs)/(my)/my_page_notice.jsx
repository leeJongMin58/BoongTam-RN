import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // 수정된 import
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router'; // 수정된 import
import colors from '../../../src/styles/color';
import { STRINGS } from '../../../src/config/string';
import typography from '../../../src/styles/typhography';
import notices from './my_notice_list';
// 샘플 공지사항 데이터

export default function NoticeScreen() {
    const [expandedItemId, setExpandedItemId] = useState(null); // 펼쳐진 항목 상태 관리
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    };

    const toggleExpand = (id) => {
        setExpandedItemId((prev) => (prev === id ? null : id)); // 클릭 시 토글
    };

    const renderItem = ({ item }) => {
        const isExpanded = expandedItemId === item.id;

        return (
            <TouchableOpacity style={styles.itemContainer} onPress={() => toggleExpand(item.id)}>
                <View style={styles.iconContainer}>
                    <MaterialIcons name="campaign" size={24} color={colors.gray500} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.date}>{item.date}</Text>

                    {/* 펼쳐진 상태에서 내용 표시 */}
                    {isExpanded && (
                        <Text style={styles.content}>
                            {item.content} {/* 항목의 내용을 표시 */}
                        </Text>
                    )}
                </View>
                <MaterialIcons
                    name={isExpanded ? 'expand-less' : 'chevron-right'}
                    size={24}
                    color={colors.gray500}
                />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            {/* 상단 네비게이션 바 */}
            <View style={styles.header}>
                <Link href="(tabs)/(my)/my" style={styles.backbutton}>
                    <MaterialIcons name="arrow-back" size={24} color={colors.gray500} />
                </Link>

                <Link href="(subs)/(my)/my_setting" style={styles.settingsButton}>
                    <MaterialIcons name="settings" size={24} color={colors.gray500} />
                </Link>
            </View>

            <View contentContainerStyle={styles.container}>
                {/* 공지사항 리스트 */}
                <FlatList
                    data={notices}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: colors.gray100,
    },
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: colors.gray100,
    },
    header: {
        height: 50,
        backgroundColor: colors.orange100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    backButton: {
        padding: 1,
    },
    settingsButton: {
        padding: 8,
    },
    headerTitle: {
        ...typography.heading.medium,
        color: colors.gray500,
        textAlign: 'center',
        flex: 1,
    },
    listContainer: {
        paddingVertical: 8,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    iconContainer: {
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.gray500,
    },
    date: {
        fontSize: 14,
        color: colors.gray500,
        marginTop: 4,
    },
    content: {
        fontSize: 14,
        color: colors.gray400,
        marginTop: 8,
    },
});
