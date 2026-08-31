import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useQuery } from '@tanstack/react-query';

import { Brand } from '@/constants/theme';
import { effectiveInvoice } from '@/services/invoice';
import { usePaymentFlow } from '@/state/payment-flow';
import type { PaymentMethod } from '@/services/payment';
import { getPaymentOptions } from '@/services/payment';
import { formatSEK } from '@/lib/money';
import { messageForError } from '@/lib/result';
import { PaymentBanner } from './payment-banner';
import { PaymentError } from './payment-error';
import { PaymentOption } from './payment-option';
import { PaymentScreen } from './payment-screen';

export function ChooseScreen() {
  const { flow, choosePayment } = usePaymentFlow();
  const invoice = flow.invoice!;
  const eff = effectiveInvoice(invoice, flow.edits);

  const quotes = useQuery({
    queryKey: ['payment-options', eff.amountMinor],
    queryFn: () => getPaymentOptions(eff.amountMinor),
  });
  const [selected, setSelected] = useState<PaymentMethod | undefined>(flow.selectedMethod);

  if (quotes.isPending) {
    return (
      <PaymentScreen step={3} title="Choose how to pay">
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator color={Brand.forest} />
        </View>
      </PaymentScreen>
    );
  }

  if (quotes.isError) {
    return (
      <PaymentScreen step={3} title="Choose how to pay">
        <PaymentError message={messageForError(quotes.error)} onRetry={() => quotes.refetch()} />
      </PaymentScreen>
    );
  }

  const options = quotes.data;
  const chosen = options.find((o) => o.method === selected);

  const subtitleFor = (method: PaymentMethod, total: number, monthly: number | null) => {
    if (method === 'PAY_NOW') return formatSEK(total);
    if (method === 'PAY_IN_30_DAYS') return `${formatSEK(total)} · due in 30 days`;
    return `${formatSEK(monthly ?? 0)} per month · ${formatSEK(total)} total`;
  };

  const next = () => {
    if (!chosen) return;
    choosePayment(chosen.method, chosen.total);
    router.push('/(payment-flow)/sign');
  };

  return (
    <PaymentScreen
      step={3}
      title="Choose how to pay"
      subtitle={`Invoice from ${eff.receiverName}`}
      footer={
        <Button mode="contained" onPress={next} disabled={!chosen}>
          Next
        </Button>
      }
    >
      {options.some((o) => !o.available) ? (
        <PaymentBanner>Some payment options aren&apos;t available for this invoice.</PaymentBanner>
      ) : null}

      {options.map((option) => (
        <PaymentOption
          key={option.method}
          title={option.label}
          subtitle={subtitleFor(option.method, option.total, option.monthlyAmount)}
          selected={selected === option.method}
          disabled={!option.available}
          onPress={() => setSelected(option.method)}
        />
      ))}
    </PaymentScreen>
  );
}
