import { router } from 'expo-router';
import { useState } from 'react';
import { Button } from 'react-native-paper';

import { usePaymentFlow } from '@/state/payment-flow';
import {
  effectiveInvoice,
  isValid,
  validate,
} from '@/services/invoice';
import { InvoiceField } from './invoice-field';
import { PaymentScreen } from './payment-screen';

export function VerifyScreen() {
  const { flow, confirmInvoice } = usePaymentFlow();
  const invoice = flow.invoice!;

  const base = effectiveInvoice(invoice, flow.edits);
  const [receiverName, setReceiverName] = useState(base.receiverName);
  const [amount, setAmount] = useState(String(base.amountKronor));
  const [dueDate, setDueDate] = useState(base.dueDate);
  const edited = { receiverName, amountKronor: Number(amount), dueDate };
  const errors = validate(effectiveInvoice(invoice, edited));
  const canContinue = isValid(errors);

  const next = () => {
    confirmInvoice({ receiverName, amountKronor: Number(amount), dueDate });
    router.push('/(payment-flow)/choose');
  };

  return (
    <PaymentScreen
      step={2}
      title="Verify the information"
      subtitle="Check the details we read from your invoice."
      footer={
        <Button mode="contained" onPress={next} disabled={!canContinue}>
          Next
        </Button>
      }
    >
      <InvoiceField
        label="Receiver"
        value={receiverName}
        onChangeText={setReceiverName}
        error={errors.receiverName}
      />
      <InvoiceField
        label="Amount (kr)"
        value={amount}
        keyboardType="numeric"
        onChangeText={(t) => setAmount(t.replace(/[^0-9.]/g, ''))}
        error={errors.amountKronor}
      />
      <InvoiceField
        label="Due date"
        value={dueDate}
        placeholder="YYYY-MM-DD"
        onChangeText={setDueDate}
        error={errors.dueDate}
      />
    </PaymentScreen>
  );
}
