# Qred invoice payment case study

A focused Expo / React Native implementation of an invoice-payment MVP. The flow follows the supplied case study:

1. Capture an invoice with the camera or choose one from the photo library.
2. Review and correct the extracted invoice details.
3. Choose to pay now, in 30 days, or in 12 monthly instalments.
4. Confirm with a mocked BankID signing step and view the receipt.

## Run it

```bash
npm install
npx expo start
```

Open the app in Expo Go on a physical phone to test camera capture. The iOS Simulator does not have a camera; use **Choose from library** with an invoice image to exercise the complete flow there.

## Quality checks

```bash
npm test -- --runInBand
npx tsc --noEmit
npm run lint
```

## Design decisions

- **Expo Router + TypeScript:** file-based navigation with strict domain types.
- **React Native Paper:** library-provided buttons, inputs, radio controls, and cards, with a small Qred theme.
- **Small service boundary:** the app calls the supplied endpoint, whose string response is expected, then uses validated mock invoice data because the endpoint does not perform OCR.
- **Clear state ownership:** TanStack Query handles API requests; a small provider in `src/state` holds the local payment flow.
- **Money in öre:** calculations use integer minor units rather than floating-point currency values.
- **Failure-first UX:** permission denial, extraction failure, signing cancellation, and payment failure all have a user-facing state.
- **Mocked payment signing:** BankID and payment processing are deliberately simulated; no payment is created.

## Design patterns

- **Provider:** `PaymentFlowProvider` keeps the in-progress invoice and selected payment option available across the flow screens.
- **Service functions:** `src/services` holds invoice extraction, payment options, and BankID mocks, keeping screens focused on the UI.
- **Query and mutation:** TanStack Query owns request loading, retry, and error state for extraction, payment options, and submission.
- **Small screen components:** payment-flow-specific UI components live beside their screens instead of a large shared component system.

## What is included

- Camera and library image selection via `expo-image-picker`
- Invoice validation
- Payment option calculation
- Mock BankID cancellation and payment failure paths
- Small unit tests for invoice validation, payment options, money formatting, and error messages

## Assumptions and limitations

This is a 5-6 hour MVP, not a production payments app. The supplied endpoint returns a bare string, so it is called to demonstrate the integration path, but the invoice record is a local typed mock. Payment quotes, BankID signing, and payment submission are also mocked.
