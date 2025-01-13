import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import colors from "../../../src/styles/color";
import typography from "../../../src/styles/typhography";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
// FAQ 데이터
const FAQ_DATA = [
    {
        question: "회원가입은 어떻게 하나요?",
        answer: "회원가입은 앱 또는 웹사이트에서 '회원가입' 버튼을 눌러 진행할 수 있습니다. 간단한 정보를 입력하고 이메일 인증을 완료하면 회원가입이 완료됩니다.",
    },
    {
        question: "비밀번호를 잊어버렸습니다. 어떻게 해야 하나요?",
        answer: "로그인 페이지에서 '비밀번호 찾기' 버튼을 눌러 이메일을 통해 비밀번호를 재설정할 수 있습니다.",
    },
    {
        question: "배송은 얼마나 걸리나요?",
        answer: "평균 배송 기간은 주문 후 2~5일입니다. 특정 지역이나 배송 상황에 따라 달라질 수 있습니다.",
    },
    {
        question: "환불 정책은 어떻게 되나요?",
        answer: "제품 수령 후 7일 이내에 환불 요청이 가능합니다. 제품이 훼손되지 않은 상태로 반품해 주셔야 하며, 자세한 환불 절차는 고객센터에 문의해 주세요.",
    },
    {
        question: "포인트는 어떻게 적립되나요?",
        answer: "포인트는 구매 금액의 1%가 적립되며, 이벤트나 특정 프로모션을 통해 추가 적립이 가능합니다.",
    },
];

export default function FAQScreen() {
    const [expandedIndex, setExpandedIndex] = useState(null);

    // 질문 클릭 시 답변 토글
    const toggleAnswer = (index) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (


        <SafeAreaView style={styles.safeContainer}>



            <View style={styles.header}>
                {/* 뒤로 가기 버튼 */}
                <Link href="(tabs)/(my)/my" style={styles.backbutton}>
                    <MaterialIcons name="arrow-back" size={24} color={colors.gray500} />
                </Link>
                
                <Text style={styles.headerTitle}>FAQ</Text>

                {/* 설정 버튼 */}
                <Link href="(subs)/(my)/my_setting" style={styles.settingsButton}>
                    <MaterialIcons name="settings" size={24} color={colors.gray500} />
                </Link>
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                {FAQ_DATA.map((item, index) => {
                    const isExpanded = expandedIndex === index;

                    return (
                        <TouchableOpacity
                            key={index}
                            style={styles.questionContainer}
                            onPress={() => toggleAnswer(index)}
                        >
                            <View style={styles.questionRow}>
                                <Text style={styles.questionText}>{item.question}</Text>
                                <MaterialIcons
                                    name={isExpanded ? "expand-less" : "expand-more"}
                                    size={24}
                                    color={colors.gray500}
                                />
                            </View>
                            {isExpanded && <Text style={styles.answerText}>{item.answer}</Text>}
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
        padding: 20,
    },
    questionContainer: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: colors.gray500,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    questionRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    questionText: {
        ...typography.body.large_bold,
        color: colors.gray500,
    },
    answerText: {
        ...typography.body.medium,
        color: colors.gray400,
        marginTop: 10,
    },
});
