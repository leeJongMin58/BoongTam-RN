import React, { useEffect, useState } from 'react';
import { Animated, PanResponder, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import Colors from '../../src/styles/color';
import Typography from '../../src/styles/typhography';

const kakaoAuthURL = 'https://kauth.kakao.com/oauth/authorize';
const REST_API_KEY = 'e44a099ba720a8a264e3766146a52572'; // 카카오 REST API 키
const REDIRECT_URI = AuthSession.makeRedirectUri({ useProxy: true });

const slides = [
  {
    text: "겨울 간식의 왕,\n붕어빵을 찾아드립니다!",
    description: "당신이 좋아하는 붕어빵 가게를 한눈에 확인하고\n나만 아는 가게도 등록해보세요.",
  },
  {
    text: "붕어빵 리뷰 평점 확인!\n 지금 바로!",
    description: "사람들이 작성한 리뷰를 살펴보고\n최고의 붕어빵 가게를 찾아보세요.",
  },
  {
    text: "붕어빵 매장\n 직접 등록하세요!",
    description: "내가 찾은 정말 맛있는 붕어빵 가게를 등록하고,\n다른 사람들과 공유해보세요.",
  },
  {
    text: "붕어빵 찾기\n지금 시작해볼까요?",
    description: "로그인하고 주변의 붕어빵 매장을\n한눈에 찾아보세요!",
  },
];

export default function FirstScreen({ navigation }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const translateX = useState(new Animated.Value(0))[0];

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      translateX.setValue(gestureState.dx);
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 50 && currentSlide > 0) {
        Animated.timing(translateX, {
          toValue: 400,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          translateX.setValue(0);
          setCurrentSlide((prev) => prev - 1);
        });
      } else if (gestureState.dx < -50 && currentSlide < slides.length - 1) {
        Animated.timing(translateX, {
          toValue: -400,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          translateX.setValue(0);
          setCurrentSlide((prev) => prev + 1);
        });
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

 
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: REST_API_KEY,
      redirectUri: REDIRECT_URI,
      responseType: AuthSession.ResponseType.Code,
    },
    {
      authorizationEndpoint: kakaoAuthURL,
    }
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log('Authorization Code:', code);
      Alert.alert('카카오 로그인 성공', `Authorization Code: ${code}`);
      navigation.replace('Order');
    } else if (response?.type === 'error') {
      Alert.alert('카카오 로그인 실패', '인증에 실패했습니다.');
    }
  }, [response]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={{
          transform: [{ translateX }],
          width: '100%',
        }}
        {...panResponder.panHandlers}
      >
        {/* 상단 배경 이미지 */}
        <Image
          source={require('../../assets/images/background.png')} // 이미지 
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.content}>
          {/* 동적으로 텍스트 변경 */}
          <Text style={styles.title}>{slides[currentSlide].text}</Text>
          <Text style={styles.description}>{slides[currentSlide].description}</Text>
        </View>
      </Animated.View>

      {/* 네비게이션 점 */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentSlide === index && styles.activeDot]}
          />
        ))}
      </View>

      {/* 로그인 버튼 */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <Text style={styles.buttonText}>카카오 로그인</Text>
      </TouchableOpacity>

      {/* 다음 버튼 */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('my_page')} // OrderScreen으로 이동
      >
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  backgroundImage: {
    width: '100%',
    height: '60%',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  title: [
    Typography.heading.large, // Typography 스타일
    {
      marginBottom: 5,      // 추가 스타일
      textAlign: 'center',  // 추가 스타일
    },
  ],
  description: [
    Typography.body.medium, // Typography 스타일
    {
    textAlign: 'center',
    marginBottom: 20,
    },
  ],
  dotsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.gray300,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: Colors.orange300,
  },
  loginButton: {
    backgroundColor: Colors.orange100,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  nextButton: {  //삭제 예정.
    backgroundColor: Colors.orange100,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: [
    Typography.label.large, // Typography 스타일
  ,
    {
      fontWeight: 'bold',
    },
  ],
});
