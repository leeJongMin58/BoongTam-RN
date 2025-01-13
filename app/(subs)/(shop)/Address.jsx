import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import colors from '../../../src/styles/color';
import typography from '../../../src/styles/typhography';
import { STRINGS } from '../../../src/config/string';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function AddressScreen() {
  const [newAddress, setNewAddress] = useState('');
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* 상단 네비게이션 */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backbutton} onPress={() => router.push('(tabs)/(shop)/shop')}>
            <MaterialIcons name="arrow-back" size={24} color={colors.gray500} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{STRINGS.BOONG_TAM.STORE.STORE_INFO}</Text>
        </View>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray200,
  },
  header: {
    height: 50,
    backgroundColor: colors.orange100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  backbutton: {
    position: 'absolute',
    left: 10,
  },
  link: {
    backgroundColor: colors.orange300,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  linkText: {
    ...typography.body.large_bold,
    color: colors.white,
  },
  headerTitle: {
    ...typography.heading.medium,
    color: colors.gray500,
  },
  tipText: {
    ...typography.heading.medium,
    color: colors.gray500,
    marginBottom: 8,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  tipDetails: {
    ...typography.body.medium,
    color: colors.gray400,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.white,
    marginBottom: 16,
    marginHorizontal: 16,
    ...typography.body.large,
  },
  saveButton: {
    backgroundColor: colors.orange300,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  saveButtonText: {
    ...typography.body.large_bold,
    color: colors.white,
  },
});
