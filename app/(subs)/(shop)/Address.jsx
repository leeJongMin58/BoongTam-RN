import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import colors from '../../../src/styles/color';
import typography from '../../../src/styles/typhography';
import { STRINGS } from '../../../src/config/string'

export default function AddressScreen() {
  const [newAddress, setNewAddress] = useState('');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.tipText}>TIP</Text>
      <Text style={styles.tipDetails}>
        {STRINGS.SHOP.ADDRESS.SUTTLE_TEXT}
      </Text>

      <TextInput
        style={styles.input}
        placeholder={STRINGS.SHOP.ADDRESS.SUTTLE_INPUT_TEXT}
        value={newAddress}
        onChangeText={setNewAddress}
      />

      <Link
        href={{
          pathname: '/BongTemShopReturn',
          params: { address: newAddress },
        }}
        style={styles.saveButton}
      >
        <Text style={styles.saveButtonText}>{STRINGS.SHOP.ADDRESS.SUTTLE_SAVE_TEXT}</Text>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray200,
    padding: 16,
    marginTop: 30,
  },
  tipText: {
    ...typography.heading.medium,
    color: colors.gray500,
    marginBottom: 8,
  },
  tipDetails: {
    ...typography.body.medium,
    color: colors.gray400,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.white,
    marginBottom: 16,
    ...typography.body.large,
  },
  saveButton: {
    backgroundColor: colors.orange300,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    ...typography.body.large_bold,
    color: colors.white,
  },
});

