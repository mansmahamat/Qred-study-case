import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Brand, Spacing } from '@/constants/theme';

const STEP_LABELS = ['1', '2', '3', 'Done'];

export function PaymentScreen({
  children,
  footer,
  step,
  title,
  subtitle,
}: {
  children: ReactNode;
  footer?: ReactNode;
  step?: number;
  title?: string;
  subtitle?: string;
}) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {step ? <PaymentSteps current={step} /> : null}
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {title ? <Text variant="headlineSmall">{title}</Text> : null}
        {subtitle ? <Text variant="bodyLarge" style={styles.subtitle}>{subtitle}</Text> : null}
        {children}
      </ScrollView>
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </SafeAreaView>
  );
}

function PaymentSteps({ current }: { current: number }) {
  return (
    <View style={styles.steps} accessibilityRole="progressbar" accessibilityValue={{ min: 1, max: 4, now: current }}>
      {STEP_LABELS.map((label, index) => {
        const number = index + 1;
        return (
          <View key={label} style={styles.stepItem}>
            <View style={[styles.stepDot, number < current && styles.stepDone, number === current && styles.stepActive]}>
              <Text variant="labelSmall">{label}</Text>
            </View>
            {index < STEP_LABELS.length - 1 ? <View style={styles.stepLine} /> : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Brand.surface },
  content: { padding: Spacing.four, gap: Spacing.three, flexGrow: 1 },
  subtitle: { color: Brand.muted, marginBottom: Spacing.two },
  footer: { padding: Spacing.four, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: Brand.border },
  steps: { flexDirection: 'row', justifyContent: 'center', padding: Spacing.two },
  stepItem: { flexDirection: 'row', alignItems: 'center' },
  stepDot: { minWidth: 30, height: 30, borderRadius: 15, backgroundColor: Brand.border, alignItems: 'center', justifyContent: 'center' },
  stepDone: { backgroundColor: Brand.forest },
  stepActive: { backgroundColor: Brand.mintChip },
  stepLine: { width: 18, height: 2, backgroundColor: Brand.border },
});
