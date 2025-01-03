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
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App({ navigation }) {
  const [location, setLocation] = useState('');
  const [currentCoords, setCurrentCoords] = useState(null);
  const [storeName, setStoreName] = useState('');
  const [storeType, setStoreType] = useState('길거리');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [days, setDays] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [timeRange, setTimeRange] = useState({ start: new Date(), end: new Date() });
  const [showPicker, setShowPicker] = useState({ start: false, end: false });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('위치 권한 필요', '현재 위치를 가져오기 위해 권한이 필요합니다.');
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      setCurrentCoords(coords);

      const address = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      if (address.length > 0) {
        const { city, district, street } = address[0];
        setLocation(`${city} ${district} ${street}`);
      }
    })();
  }, []);

  const handleMarkerDragEnd = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setCurrentCoords({ latitude, longitude });

    const address = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (address.length > 0) {
      const { city, district, street } = address[0];
      setLocation(`${city} ${district} ${street}`);
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

  const handleTimeChange = (event, selectedTime, type) => {
    setShowPicker({ ...showPicker, [type]: false });
    if (selectedTime) {
      setTimeRange((prev) => ({
        ...prev,
        [type]: selectedTime,
      }));
    }
  };

  const handleTimeInput = (text, type) => {
    // 숫자만 입력 가능하도록 필터링
    let filteredText = text.replace(/[^0-9]/g, '');
  
    // 4자리 이상 입력 불가
    if (filteredText.length > 4) {
      filteredText = filteredText.slice(0, 4);
    }
  
    // 자동으로 ":" 추가
    if (filteredText.length > 2) {
      filteredText = `${filteredText.slice(0, 2)}:${filteredText.slice(2)}`;
    }
  
    // 상태 업데이트
    setTimeRange((prev) => ({
      ...prev,
      [type]: filteredText,
    }));
  };
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                  if (navigation) navigation.goBack();
                  else alert('뒤로가기');
                }}
              >
                <Text style={styles.backButtonText}>←</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Community</Text>
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
                {['현금', '카드', '계좌이체'].map((method) => (
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
  <Text style={styles.label}>출몰 시간대 (선택)</Text>
  <View style={styles.row}>
    <TextInput
      style={styles.inputSmall}
      value={timeRange.start}
      onChangeText={(text) => handleTimeInput(text, 'start')}
      placeholder="시작 시간 (12:00)"
      keyboardType="numeric"
      maxLength={5}
    />
    <Text style={styles.label}>부터</Text>
    <TextInput
      style={styles.inputSmall}
      value={timeRange.end}
      onChangeText={(text) => handleTimeInput(text, 'end')}
      placeholder="종료 시간 (19:00)"
      keyboardType="numeric"
      maxLength={5}
    />
    <Text style={styles.label}>까지</Text>
  </View>
</View>


            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>등록하기</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  map: {
    height: 250,
    width: '100%',
    marginBottom: 20,
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
    backgroundColor: '#ffd700',
    borderColor: '#ff0',
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#ffd700',
    borderRadius: 20,
    padding: 10,
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  tagGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#ffd700',
    color: '#fff',
    borderRadius: 20,
    padding: 8,
    marginRight: 5,
    marginBottom: 5,
  },
  submitButton: {
    backgroundColor: '#ffa500',
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
    backgroundColor: '#ffd700',
    borderColor: '#ff0',
  },
});

