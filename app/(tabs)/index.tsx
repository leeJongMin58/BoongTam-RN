import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Typography from '@/constants/Typography';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.displayLarge}>Maplestory Light 적용</Text>
      <Text style={styles.displayMedium}>Maplestory Bold 적용</Text>
      <Text style={styles.bodyLarge}>NanumSquare Regular 적용</Text>
      <Text style={styles.bodyLargeBold}>NanumSquare Bold 적용</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayLarge: StyleSheet.flatten([
    Typography.headig.heading_large,
  ]),
  displayMedium: StyleSheet.flatten([
    Typography.headig.heading_small_bold,
  ]),
  bodyLarge: StyleSheet.flatten([
    Typography.body.body_large,
  ]),
  bodyLargeBold: StyleSheet.flatten([
    Typography.body.body_large_bold,
  ]),
});
