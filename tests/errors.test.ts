import { messageForError } from '../src/lib/result';

describe('messageForError', () => {
  it('turns connection failures into a clear next step', () => {
    expect(messageForError({ code: 'NETWORK', message: 'fetch failed' })).toBe(
      'We could not connect. Check your internet connection and try again.',
    );
  });

  it('keeps a useful cancellation message', () => {
    expect(messageForError({ code: 'CANCELLED', message: 'You cancelled the BankID signing.' })).toBe(
      'You cancelled the BankID signing.',
    );
  });
});
