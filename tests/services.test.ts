import { effectiveInvoice, mockInvoice, validate } from '../src/services/invoice';
import { calculateFinancing } from '../src/services/payment';

describe('services', () => {
  it('requires a valid invoice before payment', () => {
    const invoice = effectiveInvoice(mockInvoice(), { receiverName: '', amountKronor: 0 });
    expect(validate(invoice)).toEqual({
      receiverName: 'Enter who to pay.',
      amountKronor: 'Enter an amount greater than 0.',
    });
  });

  it('offers the three payment choices', () => {
    expect(calculateFinancing(1_915_700).map((option) => option.method)).toEqual([
      'PAY_NOW',
      'PAY_IN_30_DAYS',
      'SPLIT_12_MONTHS',
    ]);
  });
});
