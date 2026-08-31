import { MD3LightTheme } from 'react-native-paper';

import { Brand } from './theme';

export const paperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Brand.forest,
    onPrimary: Brand.surface,
    primaryContainer: Brand.mint,
    onPrimaryContainer: Brand.ink,
    error: Brand.danger,
    outline: Brand.border,
    onSurface: Brand.ink,
    onSurfaceVariant: Brand.muted,
    surface: Brand.surface,
  },
};
