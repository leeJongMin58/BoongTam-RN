import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../src/styles/color';
import Typography from '../../../src/styles/typhography';

const SignupComplete = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 상단 완료 아이콘 */}
      <View style={styles.iconWrapper}>
        <View style={styles.iconCircle}>
          <MaterialIcons name='check' size={70} color={Colors.white}/>
        </View>
      </View>

      {/* 완료 메시지 */}
      <Text style={styles.completeText}>회원가입 완료!</Text>
      <Text style={styles.subText}>내 주변 붕어빵 매장을 찾으러 가볼까요?</Text>

      {/* 하단 버튼 */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => router.push('(tabs)/boongtam') /* 메인화면으로 이동 */}
      >
        <Text style={styles.startButtonText}>붕어탐정 시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.white,
  },
  iconWrapper: {
    marginBottom: 30,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.orange100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 40,
    color: Colors.white,
  },
  completeText: {
    ...Typography.body.large_bold,
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    ...Typography.body.large_bold,
    color: Colors.gray500,
    textAlign: 'center',
    marginBottom: 50,
  },
  startButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.orange100,
    borderRadius: 5,
  },
  startButtonText: {
    ...Typography.body.large_bold,
    color: Colors.gray500,
  },
});

export default SignupComplete;
