import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../src/styles/color';
import Typography from '../../../src/styles/typhography';

const LoginNickname = () => {
  const [nickname, setNickname] = useState('');
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
  const router = useRouter();

  // Mock 데이터베이스의 닉네임 배열 (임시 데이터)
  const existingNicknames = ['user1', 'user2', 'testname'];

  const handleNicknameChange = (text) => {
    setNickname(text.trim()); // 공백 제거
    setIsDuplicateChecked(false); // 닉네임이 변경되면 중복체크 초기화
  };

  const handleDuplicateCheck = () => {
    if (existingNicknames.some(existing => existing.toLowerCase() === nickname.toLowerCase())) {
      // 닉네임이 데이터베이스에 존재할 때 알림
      Alert.alert('중복체크 실패', '이미 존재하는 닉네임입니다. 다른 닉네임을 사용해주세요.');
    } else {
      // 닉네임 사용 가능할 때 알림
      setIsDuplicateChecked(true);
      Alert.alert('중복체크 완료', '사용 가능한 닉네임입니다!');
    }
  };

  const isNextButtonEnabled = isDuplicateChecked;

  return (
    <View style={styles.container}>
      {/* 상단 네비게이션 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name='arrow-back' size={30} color={Colors.gray500} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>회원가입</Text>
        <Text style={styles.pageIndicator}>1 / 3</Text>
      </View>

      {/* 닉네임 입력 */}
      <View style={styles.nicknameSection}>
        <Text style={styles.label}>닉네임</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="닉네임"
            value={nickname}
            onChangeText={handleNicknameChange}
          />
          <TouchableOpacity
            style={[
              styles.duplicateCheckButton,
              { backgroundColor: nickname.length >= 4 ? Colors.orange100 : Colors.gray200 },
            ]}
            onPress={handleDuplicateCheck}
            disabled={nickname.length < 4}
          >
            <Text style={styles.duplicateCheckText}>중복 체크</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.helperText}>
          닉네임은 이모티콘 제외 4~10글자로 만들어주세요
        </Text>
      </View>

      {/* 하단 버튼 */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            {
              backgroundColor: isNextButtonEnabled ? Colors.orange100 : Colors.gray200,
            },
          ]}
          disabled={!isNextButtonEnabled}
          onPress={() => {
            if (isNextButtonEnabled) {
              router.push('/nextStep'); // 다음 화면으로 이동
            }
          }}
        >
          <Text style={styles.nextButtonText}>
            {isNextButtonEnabled ? '다음' : '건너뛰기'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    ...Typography.heading.small_bold,
  },
  pageIndicator: {
    ...Typography.heading.small_bold,
    color: Colors.orange100,
  },
  nicknameSection: {
    flex: 1,
    justifyContent: 'flex-start', // 수직 위치 조정
    alignItems: 'center',         // 수평 위치 중앙
    marginTop: 300,                // 원하는 여백 추가
  }, 
  label: {
    ...Typography.body.large_bold,
    marginBottom: 10,
    alignSelf: 'flex-start'
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    height: 60,
    borderWidth: 1,
    borderColor: Colors.orange100,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  duplicateCheckButton: {
    paddingVertical: 22,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  duplicateCheckText: {
    color: Colors.gray500,
  },
  helperText: {
    marginTop: 10,
    ...Typography.body.medium,
    color: Colors.gray300,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '100%',
  },
  nextButtonText: {
    ...Typography.body.large_bold,
    color: Colors.gray500,
  },
});

export default LoginNickname;