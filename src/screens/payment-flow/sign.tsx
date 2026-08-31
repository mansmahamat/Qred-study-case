import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useMutation } from '@tanstack/react-query';

import { Brand, Spacing } from '@/constants/theme';
import { effectiveInvoice } from '@/services/invoice';
import { usePaymentFlow } from '@/state/payment-flow';
import { signWithBankId } from '@/services/signing';
import { submitPayment } from '@/services/payment';
import { formatDate } from '@/lib/dates';
import { formatSEK } from '@/lib/money';
import { messageForError } from '@/lib/result';
import { PaymentBanner } from './payment-banner';
import { PaymentScreen } from './payment-screen';
import { PaymentSummary } from './payment-summary';

const METHOD_LABEL: Record<string, string> = {
  PAY_NOW: 'Pay now',
  PAY_IN_30_DAYS: 'Pay in 30 days',
  SPLIT_12_MONTHS: 'Split in 12 months',
};

export function SignScreen() {
  const { flow, finishPayment } = usePaymentFlow();
  const submit = useMutation({ mutationFn: submitPayment });
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const invoice = flow.invoice!;
  const eff = effectiveInvoice(invoice, flow.edits);
  const total = flow.selectedTotal ?? eff.amountMinor;

  // Dev control to demo the different BankID outcomes.
  const run = async (cancelled = false) => {
    setError(null);
    setSigning(true);
    const signed = await signWithBankId(cancelled);
    setSigning(false);

    if (!signed) {
      setError('You cancelled the BankID signing.');
      return;
    }

    submit.mutate(undefined, {
      onSuccess: (transactionId) => {
        finishPayment(transactionId);
        router.replace('/(payment-flow)/done');
      },
      onError: (error) => setError(messageForError(error)),
    });
  };

  const busy = signing || submit.isPending;

  return (
    <PaymentScreen
      step={4}
      title="Sign & seal"
      subtitle="Confirm the payment with BankID."
      footer={
        <View style={styles.footer}>
          <Button mode="contained" onPress={() => run()} loading={busy}>
            {signing ? 'Waiting for BankID…' : submit.isPending ? 'Confirming…' : 'Open BankID'}
          </Button>
          <Button mode="text" onPress={() => run(true)} disabled={busy}>
            Simulate cancel
          </Button>
        </View>
      }
    >
      <PaymentSummary
        rows={[
          { label: 'Receiver', value: eff.receiverName },
          { label: 'Payment option', value: METHOD_LABEL[flow.selectedMethod ?? ''] ?? '—' },
          { label: 'Due date', value: formatDate(eff.dueDate) },
          { label: 'Total', value: formatSEK(total) },
        ]}
      />

      {error ? <PaymentBanner>{error}</PaymentBanner> : null}

      <Text style={styles.hint}>
        This is a mock BankID step. &quot;Open BankID&quot; simulates a successful sign; use
        &quot;Simulate cancel&quot; to see the cancelled state.
      </Text>
    </PaymentScreen>
  );
}

const styles = StyleSheet.create({
  footer: { gap: Spacing.two },
  hint: { fontSize: 13, color: Brand.muted, lineHeight: 18 },
});
