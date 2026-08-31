import { createContext, type ReactNode, useContext, useState } from 'react';

import type { Invoice, InvoiceEdits } from '@/services/invoice';
import type { PaymentMethod } from '@/services/payment';

export type PaymentFlow = {
  imageUri?: string;
  invoice?: Invoice;
  edits: InvoiceEdits;
  selectedMethod?: PaymentMethod;
  selectedTotal?: number;
  transactionId?: string;
};

function newFlow(): PaymentFlow {
  return { edits: {} };
}

type PaymentFlowContextValue = {
  flow: PaymentFlow;
  startWithPhoto: (imageUri: string) => void;
  saveInvoice: (invoice: Invoice) => void;
  confirmInvoice: (edits: InvoiceEdits) => void;
  choosePayment: (method: PaymentMethod, total: number) => void;
  finishPayment: (transactionId: string) => void;
  reset: () => void;
};

const PaymentFlowContext = createContext<PaymentFlowContextValue | null>(null);

export function PaymentFlowProvider({ children }: { children: ReactNode }) {
  const [flow, setFlow] = useState(newFlow);

  const value: PaymentFlowContextValue = {
    flow,
    startWithPhoto: (imageUri) => setFlow({ ...newFlow(), imageUri }),
    saveInvoice: (invoice) => setFlow((current) => ({ ...current, invoice })),
    confirmInvoice: (edits) => setFlow((current) => ({ ...current, edits })),
    choosePayment: (method, total) => setFlow((current) => ({ ...current, selectedMethod: method, selectedTotal: total })),
    finishPayment: (transactionId) => setFlow((current) => ({ ...current, transactionId })),
    reset: () => setFlow(newFlow()),
  };

  return <PaymentFlowContext.Provider value={value}>{children}</PaymentFlowContext.Provider>;
}

export function usePaymentFlow() {
  const value = useContext(PaymentFlowContext);
  if (!value) throw new Error('usePaymentFlow must be used inside PaymentFlowProvider.');
  return value;
}
