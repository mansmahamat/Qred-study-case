export const kronorToMinor = (kronor: number): number => Math.round(kronor * 100);
export const minorToKronor = (minor: number): number => minor / 100;

export const formatSEK = (minor: number) =>
  `${Math.round(minorToKronor(minor)).toLocaleString('sv-SE')} kr`;
