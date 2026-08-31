import { formatSEK, kronorToMinor, minorToKronor } from '../src/lib/money';

describe('money', () => {
  it('converts between kronor and minor units', () => {
    expect(kronorToMinor(19157)).toBe(1_915_700);
    expect(minorToKronor(1_915_700)).toBe(19157);
  });

  it('formats minor units as SEK with sv-SE grouping', () => {
    expect(formatSEK(1_915_700).replace(/ /g, ' ')).toBe('19 157 kr');
  });
});
