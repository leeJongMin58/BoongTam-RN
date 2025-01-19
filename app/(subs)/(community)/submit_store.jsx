import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from 'react-native-vector-icons';
import Colors from '../../../src/styles/color';
import Typography from '../../../src/styles/typhography';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { submitStore } from '../../../src/usecases/communityUsecase';

export default function App({ navigation }) {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [currentCoords, setCurrentCoords] = useState(null);
  const [storeName, setStoreName] = useState('');
  const [storeType, setStoreType] = useState('길거리');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [days, setDays] = useState([]);
  const [openHour, setOpenHour] = useState('');
  const [closeHour, setCloseHour] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('위치 권한 필요', '현재 위치를 가져오기 위해 권한이 필요합니다.');
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync({});
      setCurrentCoords(coords);

      try {
        const address = await Location.reverseGeocodeAsync({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        if (address.length > 0) {
          const { city = '', district = '', street = '', name = '' } = address[0];
          const fullAddress = `${city} ${district} ${street} ${name}`.trim();
          setLocation(fullAddress || '주소를 찾을 수 없습니다.');
        } else {
          setLocation('주소를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('Error in reverseGeocode:', error);
        setLocation('주소를 가져오는 중 오류가 발생했습니다.');
      }
    })();
  }, []);

  const handleMarkerDragEnd = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setCurrentCoords({ latitude, longitude });
    const address = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (address.length > 0) {
      const { city = '', district = '', street = '', name = '' } = address[0];
      setLocation(`${city} ${district} ${street} ${name}`.trim());
    } else {
      setLocation('주소를 찾을 수 없습니다.');
    }
  };

  const togglePaymentMethod = (method) => {
    setPaymentMethods((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
    );
  };

  const toggleDay = (day) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleTimeInput = (text, type) => {
    let filteredText = text.replace(/[^0-9]/g, '');
    if (filteredText.length > 4) {
      filteredText = filteredText.slice(0, 4);
    }
    if (filteredText.length > 2) {
      filteredText = `${filteredText.slice(0, 2)}:${filteredText.slice(2)}`;
    }
    if (type === 'open') {
      setOpenHour(filteredText);
    } else {
      setCloseHour(filteredText);
    }
  };

  const handleSubmit = async () => {
    if (!storeName || !location || !currentCoords) {
      Alert.alert('필수 입력 누락', '매장 이름, 위치, 좌표를 입력하세요.');
      return;
    }

    const isBoongtamOrder = paymentMethods.includes('붕탐오더');

    const storeInfo = {
      lat: currentCoords.latitude,
      lng: currentCoords.longitude,
      address: location,
      name: storeName,
      store_type: storeType,
      appearance_day: days,
      open_hour: openHour,
      close_hour: closeHour,
      payment_method: paymentMethods,
      is_order_online: isBoongtamOrder,
    };

    try {
      const response = await submitStore(storeInfo);
      Alert.alert(
        '등록 성공',
        '매장 등록이 완료되었습니다.',
        [
          {
            text: '확인',
            onPress: () => {
              router.push('/(tabs)/(community)/(main)/community');
            },
          },
        ]
      );
    } catch (error) {
      console.error('Submit Error:', error.response?.data || error.message);
      Alert.alert('등록 실패', '매장 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
              <View style={styles.header}>
                <TouchableOpacity
                  style={styles.backbutton}
                  onPress={() => router.push('/(tabs)/(community)/(main)/community')}
                >
                  <MaterialIcons name="arrow-back" size={24} color={Colors.gray500} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>매장 제보하기</Text>
              </View>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: currentCoords?.latitude || 37.5665,
                  longitude: currentCoords?.longitude || 126.978,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02,
                }}
                region={
                  currentCoords && {
                    latitude: currentCoords.latitude,
                    longitude: currentCoords.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                  }
                }
              >
                {currentCoords && (
                  <Marker
                    coordinate={currentCoords}
                    draggable
                    onDragEnd={handleMarkerDragEnd}
                  />
                )}
              </MapView>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>가게 위치</Text>
                <TextInput
                  style={styles.input}
                  value={location}
                  onChangeText={setLocation}
                  placeholder="가게 위치 입력"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>매장 이름</Text>
                <TextInput
                  style={styles.input}
                  value={storeName}
                  onChangeText={setStoreName}
                  placeholder="매장 이름 입력"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>매장 형태</Text>
                <View style={styles.buttonGroup}>
                  {['길거리', '매장', '편의점'].map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[styles.button, storeType === type && styles.buttonSelected]}
                      onPress={() => setStoreType(type)}
                    >
                      <Text style={styles.buttonText}>{type}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>결제 방식 (다중 선택 가능)</Text>
                <View style={styles.buttonGroup}>
                  {['현금', '카드', '붕탐오더'].map((method) => (
                    <TouchableOpacity
                      key={method}
                      style={[
                        styles.button,
                        paymentMethods.includes(method) && styles.buttonSelected,
                      ]}
                      onPress={() => togglePaymentMethod(method)}
                    >
                      <Text style={styles.buttonText}>{method}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>결제 시기</Text>
                <View style={styles.buttonGroupSingleLine}>
                  {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
                    <TouchableOpacity
                      key={day}
                      style={[
                        styles.paymentButton,
                        days.includes(day) && styles.paymentButtonSelected,
                      ]}
                      onPress={() => toggleDay(day)}
                    >
                      <Text style={styles.buttonText}>{day}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>운영 시간</Text>
                <View style={styles.row}>
                  <TextInput
                    style={styles.inputSmall}
                    value={openHour}
                    onChangeText={(text) => handleTimeInput(text, 'open')}
                    placeholder="오픈 시간 (예: 10:00)"
                    keyboardType="numeric"
                    maxLength={5}
                  />
                  <Text style={styles.label}>부터</Text>
                  <TextInput
                    style={styles.inputSmall}
                    value={closeHour}
                    onChangeText={(text) => handleTimeInput(text, 'close')}
                    placeholder="종료 시간 (예: 20:00)"
                    keyboardType="numeric"
                    maxLength={5}
                  />
                  <Text style={styles.label}>까지</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>등록하기</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray100,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
    padding: 10
  },
  backbutton: {
    position: 'absolute',
    left: 5,
    padding: 5
  },
  headerTitle: {
    ...Typography.heading.small_bold,
    textAlign: 'center'
  },
  map: {
    height: 250,
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  inputSmall: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    justifyContent: 'center',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
  },
  buttonGroupSingleLine: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    minWidth: 110,
    alignItems: 'center',
  },
  buttonSelected: {
    backgroundColor: '#FFD700',
    borderColor: '#ff0',
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#FFA500',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  paymentButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: 45,
    alignItems: 'center',
  },
  paymentButtonSelected: {
    backgroundColor: '#FFD700',
    borderColor: '#ff0',
  },
});
