export const config = {
  apiBaseUrl:
    process.env.EXPO_PUBLIC_API_BASE_URL ??
    'https://c20zuamcv7.execute-api.eu-north-1.amazonaws.com/default',
  mockPaymentDelayMs: Number(process.env.EXPO_PUBLIC_MOCK_PAYMENT_DELAY_MS ?? 1200),
  mockPaymentSuccessRate: Number(process.env.EXPO_PUBLIC_MOCK_PAYMENT_SUCCESS_RATE ?? 0.9),
} as const;

export const endpoints = {
  extractInvoice: '/CaseStudy_Dummy_Endpoint',
} as const;
