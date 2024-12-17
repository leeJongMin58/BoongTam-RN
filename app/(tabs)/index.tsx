import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Typography from '@/constants/Typography';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={Typography.display.display_large}>Maplestory Light 적용</Text>
      <Text style={Typography.display.display_medium}>Maplestory Bold 적용</Text>
      <Text style={Typography.body.body_large}>NanumSquare Regular 적용</Text>
      <Text style={Typography.body.body_large_bold}>NanumSquare Bold 적용</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
