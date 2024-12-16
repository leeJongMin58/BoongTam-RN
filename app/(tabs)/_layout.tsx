import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // 모든 페이지 헤더 숨김
      }}
    />
  );
}
