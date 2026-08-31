import { StyleSheet, View } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';

import { Spacing } from '@/constants/theme';

export function PaymentSummary({ rows }: { rows: { label: string; value: string }[] }) {
  return <Card mode="outlined" style={styles.card}>{rows.map((row, index) => <View key={row.label}>{index > 0 ? <Divider /> : null}<View style={styles.row}><Text variant="bodyMedium">{row.label}</Text><Text variant="titleSmall" style={styles.value}>{row.value}</Text></View></View>)}</Card>;
}

const styles = StyleSheet.create({ card: { overflow: 'hidden' }, row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Spacing.three, gap: Spacing.three }, value: { flexShrink: 1, textAlign: 'right' } });
