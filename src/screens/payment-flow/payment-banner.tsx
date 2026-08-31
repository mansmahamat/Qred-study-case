import { StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';

import { Brand, Radius, Spacing } from '@/constants/theme';

export function PaymentBanner({ children }: { children: string }) {
  return (
    <Surface accessibilityRole="alert" elevation={0} style={styles.banner}>
      <Text variant="bodySmall">{children}</Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  banner: { padding: Spacing.three, borderRadius: Radius.md, backgroundColor: '#FFF8EC', borderWidth: 1, borderColor: Brand.warn },
});
