import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; 

// 색상 상수화  
const COLORS = {  
    liked: "#FF6F61",
    star: "#FFD700",
    iconInactive: "#999",
  };
// 이미지 동적 렌더링 
  export default function ProfileCard() {
    const [isLiked, setIsLiked] = useState(false);
    const [images, setImages] = useState([
      "https://i.pinimg.com/736x/be/0a/36/be0a3668b48098bfa09e71a4394802a1.jpg",
      "https://i.pinimg.com/736x/be/0a/36/be0a3668b48098bfa09e71a4394802a1.jpg",
      "https://i.pinimg.com/736x/be/0a/36/be0a3668b48098bfa09e71a4394802a1.jpg",
      "https://i.pinimg.com/736x/be/0a/36/be0a3668b48098bfa09e71a4394802a1.jpg",

    ]);
    const [reviewText, setReviewText] = useState(
      "제가 반죽이 부드러운 붕어빵을 좋아하는데 여기 매장은 주문하고 바로 구워주셔서 너무너무 맛있었어요ㅠㅠ 사장님도 너무 친절하심!"
    );
    const [showFullText, setShowFullText] = useState(false);
  
    const handleHeartClick = () => {
      setIsLiked(!isLiked);
    };
  
    return (
      <View style={styles.cardContainer}>
        {/* 상단 프로필 정보 */}
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://www.gklibrarykor.com/wp-content/uploads/2024/08/1_%EA%B0%95%EC%95%84%EC%A7%80%EC%9D%98-%EC%8B%A0%EC%B2%B4%EC%A0%81-%ED%8A%B9%EC%A7%95.jpg",
            }}
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>고영희</Text>
            <Text style={styles.userDetails}>리뷰: 100+개 | 평균 평점: 5.0</Text>
          </View>
          <MaterialIcons name="more-vert" size={20} color="gray" />
        </View>
  
        {/* 별점 및 이미지 */}
        <View style={styles.ratingSection}>
          <View style={styles.stars}>
            {[...Array(5)].map((_, index) => (
              <MaterialIcons
                key={index}
                name={index < 5 ? "star" : "star-half"}
                size={18}
                color={COLORS.star}
              />
            ))}
          </View>
          <View style={styles.imageGallery}>
            {images.map((img, index) => (
              <Image key={index} source={{ uri: img }} style={styles.galleryImage} />
            ))}
            <TouchableOpacity style={styles.addImageButton}>
              <MaterialIcons name="add" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
  
        {/* 리뷰 내용 */}
        <Text style={styles.reviewText}>
        {/* showFullText 상태에 따라 전체 리뷰 텍스트를 보여줄지, 잘라서 보여줄지 결정 */}
          {showFullText ? reviewText : `${reviewText.slice(0, 50)}...`}
          <Text
            onPress={() => setShowFullText(!showFullText)}
            style={styles.moreText}
          >
            {showFullText ? " 접기" : " 더보기"}
          </Text>
        </Text>
  
        {/* 하단 아이콘 */}
        <View style={styles.footer}>
          <View style={styles.footerIcon}>
            <TouchableOpacity onPress={handleHeartClick}>
              <MaterialIcons
                name={isLiked ? "favorite" : "favorite-border"}
                size={24}
                color={isLiked ? COLORS.liked : COLORS.iconInactive}
              />
            </TouchableOpacity>
            <Text style={styles.footerText}>10</Text>
          </View>
          <View style={styles.footerIcon}>
            <MaterialIcons name="message" size={18} color={COLORS.iconInactive} />
            <Text style={styles.footerText}>20</Text>
          </View>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
      padding: 15,
      margin: 10,
      elevation: 3,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 3 },
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    userInfo: {
      flex: 1,
      marginLeft: 10,
    },
    userName: {
      fontSize: 16,
      fontWeight: "bold",
    },
    userDetails: {
      fontSize: 12,
      color: "gray",
    },
    ratingSection: {
      marginVertical: 10,
    },
    stars: {
      flexDirection: "row",
      marginBottom: 10,
    },
    imageGallery: {
      flexDirection: "row",
      alignItems: "center",
    },
    galleryImage: {
      width: 60,
      height: 60,
      borderRadius: 5,
      marginRight: 5,
    },
    addImageButton: {
      width: 60,
      height: 60,
      backgroundColor: "#FF9800",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    reviewText: {
      color: "#333",
      lineHeight: 20,
      marginVertical: 10,
    },
    moreText: {
      color: COLORS.liked,
      fontWeight: "bold",
    },
    footer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      marginTop: 10,
    },
    footerIcon: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 20,
    },
    footerText: {
      marginLeft: 5,
      fontSize: 14,
      color: "#333",
    },
  });