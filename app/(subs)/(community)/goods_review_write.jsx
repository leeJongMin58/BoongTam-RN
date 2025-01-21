import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../../src/styles/color';
import { writeGoodsReview } from '../../../src/usecases/communityUsecase';

export default function ReviewPage() {
  const [reviewText, setReviewText] = useState('');
  const [images, setImages] = useState([]);
  const router = useRouter();


  const handleTextChange = (text) => {
    if (text.length <= 300) {
      setReviewText(text);
    } else {
      alert('리뷰는 최대 300자까지 입력 가능합니다.');
    }
  };

  const addImage = async () => {
    console.log('이미지 선택 시작');

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log('Permission Result:', permissionResult);

    if (!permissionResult.granted) {
      Alert.alert('갤러리 접근 권한이 필요합니다.');
      return;
    }

    console.log('갤러리 열기');
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('Image Picker Result:', result);

    if (!result.canceled) {
      if (images.length >= 3) {
        Alert.alert('이미지는 최대 3장까지 추가할 수 있습니다.');
        return;
      }
      setImages((prevImages) => [...prevImages, result.assets[0].uri]);
    } else {
      console.log('이미지 선택이 취소되었습니다.');
    }
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleRegister = async () => {
    try {
      const goodsId = 10;
      const rating = -1
      const response = await writeGoodsReview(goodsId, reviewText, rating, images);

      if (response.code === 201) {
        Alert.alert(response.msg, '리뷰가 성공적으로 등록되었습니다.', [
          {
            text: '확인',
            onPress: () => {
              router.push('/(tabs)/(community)/(main)/community');
            },
          },
        ]);
      } else {
        Alert.alert('리뷰 작성 실패', '리뷰 작성에 실패했습니다.');
      }
    } catch (error) {
      Alert.alert('리뷰 작성 실패', '리뷰 작성 중 오류가 발생했습니다.');
      console.error('Error in handleRegister:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/(community)/(main)/community')}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>굿즈 리뷰 작성</Text>
      </View>

      {/* 가게 이름 */}
      <View style={styles.shopInfo}>
        <Text style={styles.shopName}>붕순이 키링 - 붕템샵</Text>
      </View>

      {/* 리뷰 작성 */}
      <View style={styles.inputGroup}>
        <Text style={styles.sectionTitle}>리뷰 쓰기</Text>
        <TextInput
          style={[
            styles.input,
            { height: Math.min(300, Math.max(100, reviewText.length / 2)) },
          ]}
          value={reviewText}
          onChangeText={handleTextChange}
          placeholder="리뷰를 작성해 주세요"
          multiline
          textAlignVertical="top"
        />
        <Text style={styles.charCount}>{reviewText.length} / 300</Text>
      </View>

      {/* 사진 첨부 */}
      <View style={styles.photoSection}>
        <Text style={styles.sectionTitle}>사진 첨부하기</Text>
        <View style={styles.photoRow}>
          {images.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.photo} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeImage(index)}
              >
                <MaterialIcons name="close" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
          {images.length < 3 && (
            <TouchableOpacity style={styles.addPhotoButton} onPress={addImage}>
              <MaterialIcons name="add-a-photo" size={36} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* 등록 버튼 */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>등록하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 25 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 30,
    position: 'relative',
  },
  backButton: { padding: 10 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  shopInfo: { alignItems: 'center', marginVertical: 15 },
  shopName: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  inputGroup: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
    backgroundColor: '#fdf8e3',
  },
  charCount: {
    marginTop: 5,
    textAlign: 'right',
    color: '#666',
    fontSize: 14,
  },
  photoSection: { marginBottom: 20 },
  photoRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 10 },
  imageContainer: {
    position: 'relative',
  },
  photo: { width: 100, height: 100, borderRadius: 10 },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: colors.orange200,
    borderRadius: 10,
    padding: 2,
    zIndex: 1,
  },
  addPhotoButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffa500',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  registerButton: {
    backgroundColor: colors.orange200,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});