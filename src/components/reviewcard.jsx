import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

const ReviewCard = ({ username, date, image, title, review }) => {
  return (
    <View style={styles.card}>
      {/* 카드 전체를 이미지 배경으로 사용 */}
      <ImageBackground source={image} style={styles.background} resizeMode="cover">
        {/* 반투명 오버레이 */}
        <View style={styles.overlay} />
        {/* 텍스트 내용 */}
        <View style={styles.content}>
          {/* 사용자 정보 */}
          <View style={styles.header}>
            <Text style={styles.profileText}>👤</Text>
            <View style={styles.userInfo}>
              <Text style={styles.username}>{username}</Text>
              <Text style={styles.date}>{date}</Text>
            </View>
          </View>
          {/* 제목 및 리뷰 */}
          <View style={styles.footer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.review}>{review}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 8,
  },
  background: {
    flex: 1,
    justifyContent: "space-between", // Header와 Footer를 위아래로 배치
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // 반투명 검정 배경으로 가독성 확보
  },
  content: {
    flex: 1,
    justifyContent: "space-between", // 텍스트를 위아래로 배치
    padding: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileText: {
    fontSize: 20,
    marginRight: 8, // 아이콘과 텍스트 간격
    color: "#fff",
  },
  userInfo: {
    flexDirection: "column",
  },
  username: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  date: {
    fontSize: 10,
    color: "#ddd",
  },
  footer: {
    // 하단 제목 및 리뷰
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 4,
  },
  review: {
    fontSize: 12,
    color: "#ff9900", // 강조된 색상
    textAlign: "center",
  },
});

export default ReviewCard;
