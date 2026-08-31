import { config } from '@/constants/config';

export type PaymentMethod = 'PAY_NOW' | 'PAY_IN_30_DAYS' | 'SPLIT_12_MONTHS';

export type PaymentOption = {
  method: PaymentMethod;
  label: string;
  total: number;
  monthlyAmount: number | null;
  available: boolean;
};

const wait = () => new Promise((resolve) => setTimeout(resolve, config.mockPaymentDelayMs));

export function calculateFinancing(amountMinor: number): PaymentOption[] {
  const total30 = Math.round(amountMinor * 1.015);
  const monthly = Math.ceil(Math.round(amountMinor * 1.0148) / 12 / 100) * 100;
  return [
    { method: 'PAY_NOW', label: 'Pay now', total: amountMinor, monthlyAmount: null, available: true },
    { method: 'PAY_IN_30_DAYS', label: 'Pay in 30 days', total: total30, monthlyAmount: null, available: true },
    { method: 'SPLIT_12_MONTHS', label: 'Split in 12 months', total: monthly * 12, monthlyAmount: monthly, available: true },
  ];
}

export async function getPaymentOptions(amountMinor: number) {
  await wait();
  return calculateFinancing(amountMinor);
}

export async function submitPayment() {
  await wait();
  if (Math.random() > config.mockPaymentSuccessRate) {
    throw { code: 'SERVER', message: 'The payment was declined. Try another method.' };
  }

  return `trx_${Date.now()}`;
}
