import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cart Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // 배경색 설정 (흰색)
  },
  text: {
    color: '#000000', // 텍스트 색상 설정 (검은색)
    fontSize: 18,
    fontWeight: 'bold',
  },
});
