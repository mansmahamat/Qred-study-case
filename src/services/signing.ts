import { config } from '@/constants/config';

export async function signWithBankId(cancelled = false): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, config.mockPaymentDelayMs));
  return !cancelled;
}
