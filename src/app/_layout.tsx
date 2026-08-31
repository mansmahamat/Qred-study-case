import { Stack, type ErrorBoundaryProps } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Spacing } from '@/constants/theme';
import { RootProvider } from '@/providers/root-provider';

SplashScreen.preventAutoHideAsync();

function ScreenErrorBoundary({ retry }: ErrorBoundaryProps) {
  return (
    <View style={styles.error}>
      <Text variant="headlineSmall">Something went wrong</Text>
      <Text variant="bodyLarge" style={styles.errorMessage}>
        Please try again.
      </Text>
      <Button mode="contained" onPress={retry}>
        Try again
      </Button>
    </View>
  );
}

export const unstable_settings = {
  screenErrorBoundary: ScreenErrorBoundary,
};

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <RootProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(payment-flow)" />
      </Stack>
    </RootProvider>
  );
}

const styles = StyleSheet.create({
  error: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.three, padding: Spacing.four },
  errorMessage: { textAlign: 'center' },
});
