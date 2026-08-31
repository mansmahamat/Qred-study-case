import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Brand, Spacing } from '@/constants/theme';
import { usePaymentFlow } from '@/state/payment-flow';

export function HomeScreen() {
  const { reset } = usePaymentFlow();

  const start = () => {
    reset();
    router.push('/(payment-flow)/capture');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.hero}>
        <Text style={styles.wordmark}>qred.</Text>
        <Text style={styles.title}>Pay an invoice</Text>
        <Text style={styles.body}>
          Snap a photo of your invoice, check the details, and choose how to pay.
        </Text>
      </View>

      <View style={styles.actions}>
        <Button mode="contained" onPress={start}>Pay an invoice</Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Brand.surface, padding: Spacing.four, justifyContent: 'space-between' },
  hero: { flex: 1, justifyContent: 'center', gap: Spacing.three },
  wordmark: { fontSize: 28, fontWeight: '800', color: Brand.forest },
  title: { fontSize: 34, fontWeight: '700', color: Brand.ink },
  body: { fontSize: 16, color: Brand.muted, lineHeight: 22 },
  actions: { gap: Spacing.two },
});
