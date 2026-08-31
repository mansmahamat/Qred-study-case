import { Stack } from 'expo-router';

export default function PaymentFlowLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: true }}>
      <Stack.Screen name="capture" />
      <Stack.Screen name="verify" />
      <Stack.Screen name="choose" />
      <Stack.Screen name="sign" />
      <Stack.Screen name="done" options={{ gestureEnabled: false }} />
    </Stack>
  );
}
