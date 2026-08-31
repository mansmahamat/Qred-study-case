import { StyleSheet, View } from 'react-native';
import { Card, RadioButton, Text, TouchableRipple } from 'react-native-paper';

import { Brand, Spacing } from '@/constants/theme';

export function PaymentOption({ title, subtitle, selected, disabled, onPress }: { title: string; subtitle: string; selected: boolean; disabled: boolean; onPress: () => void }) {
  return (
    <Card mode="outlined" style={[styles.card, selected && styles.selected, disabled && styles.disabled]}>
      <TouchableRipple disabled={disabled} onPress={onPress} style={styles.row}>
        <View style={styles.content}>
          <RadioButton value={title} status={selected ? 'checked' : 'unchecked'} disabled={disabled} />
          <View style={styles.text}><Text variant="titleMedium">{title}</Text><Text variant="bodyMedium">{subtitle}</Text></View>
        </View>
      </TouchableRipple>
    </Card>
  );
}

const styles = StyleSheet.create({ card: { backgroundColor: Brand.surface }, selected: { borderColor: Brand.forest, backgroundColor: Brand.mint }, disabled: { opacity: 0.45 }, row: { borderRadius: 12 }, content: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three, padding: Spacing.three }, text: { flex: 1, gap: 2 } });
