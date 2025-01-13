import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const API_KEY = "1W63Vk05fVIUiO5hzSORUw"; // 스마트택배에서 발급받은 API 키
const BASE_URL = "https://info.sweettracker.co.kr"; // 스마트택배 API 기본 URL

// fetch를 사용한 택배 조회 함수
const trackParcel = async (carrierCode, trackingNumber) => {
    try {
        const response = await fetch(`${BASE_URL}/trackings`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                carrier_code: carrierCode,
                tracking_number: trackingNumber,
            }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error tracking parcel:", error.message);
        throw error;
    }
};

const ParcelTracking = () => {
    const [carrierCode, setCarrierCode] = useState("");
    const [trackingNumber, setTrackingNumber] = useState("");
    const [trackingInfo, setTrackingInfo] = useState(null);
    const [error, setError] = useState("");

    const handleTrack = async () => {
        setError("");
        setTrackingInfo(null);
        try {
            const result = await trackParcel(carrierCode, trackingNumber);
            setTrackingInfo(result);
        } catch (err) {
            setError("조회에 실패했습니다. 송장 번호를 확인해주세요.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>택배사 코드:</Text>
            <TextInput
                style={styles.input}
                value={carrierCode}
                onChangeText={setCarrierCode}
                placeholder="예: CJGLS"
            />
            <Text style={styles.label}>송장 번호:</Text>
            <TextInput
                style={styles.input}
                value={trackingNumber}
                onChangeText={setTrackingNumber}
                placeholder="송장 번호 입력"
            />
            <Button title="조회하기" onPress={handleTrack} />
            {error && <Text style={styles.error}>{error}</Text>}
            {trackingInfo && (
                <View style={styles.result}>
                    <Text>조회 결과:</Text>
                    <Text>{JSON.stringify(trackingInfo, null, 2)}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    error: {
        color: "red",
        marginTop: 10,
    },
    result: {
        marginTop: 20,
    },
});

export default ParcelTracking;
