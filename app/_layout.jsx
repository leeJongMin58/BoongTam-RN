import React from 'react';
import { Stack } from 'expo-router';
import { CartProvider } from '../src/services/CartContext'; // CartContext 경로에 맞게 수정

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </CartProvider>
  );
}
