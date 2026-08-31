import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import { Brand, Spacing } from '@/constants/theme';
import { effectiveInvoice } from '@/services/invoice';
import { usePaymentFlow } from '@/state/payment-flow';
import { formatSEK } from '@/lib/money';
import { PaymentScreen } from './payment-screen';
import { PaymentSummary } from './payment-summary';

export function DoneScreen() {
  const { flow, reset } = usePaymentFlow();
  const invoice = flow.invoice!;
  const eff = effectiveInvoice(invoice, flow.edits);

  const finish = () => {
    reset();
    router.dismissTo('/');
  };

  return (
    <PaymentScreen
      footer={
        <Button mode="contained" onPress={finish}>Done</Button>
      }
    >
      <View style={styles.hero}>
        <View style={styles.badge}>
          <Text style={styles.badgeMark}>✓</Text>
        </View>
        <Text style={styles.title}>Payment confirmed</Text>
        <Text style={styles.body}>Your payment to {eff.receiverName} has been signed and sent.</Text>
      </View>

      <PaymentSummary
        rows={[
          { label: 'Receiver', value: eff.receiverName },
          { label: 'Amount', value: formatSEK(flow.selectedTotal ?? eff.amountMinor) },
          { label: 'Reference', value: eff.ocrReference },
          { label: 'Transaction', value: flow.transactionId ?? '—' },
        ]}
      />
    </PaymentScreen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', gap: Spacing.two, paddingVertical: Spacing.five },
  badge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Brand.forest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeMark: { color: Brand.surface, fontSize: 32, fontWeight: '800' },
  title: { fontSize: 24, fontWeight: '700', color: Brand.ink },
  body: { fontSize: 15, color: Brand.muted, textAlign: 'center' },
});
