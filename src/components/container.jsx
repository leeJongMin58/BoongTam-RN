import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../styles/color';
const Container = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
  },
});

export default Container;
