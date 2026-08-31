import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Spacing } from '@/constants/theme';

export function PaymentError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={styles.container}>
      <Text accessibilityLiveRegion="assertive" variant="bodyLarge">{message}</Text>
      <Button mode="contained" onPress={onRetry}>Try again</Button>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.three, padding: Spacing.four } });
