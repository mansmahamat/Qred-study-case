import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useMutation } from '@tanstack/react-query';

import { Brand, Radius, Spacing } from '@/constants/theme';
import { usePaymentFlow } from '@/state/payment-flow';
import { messageForError } from '@/lib/result';
import { extractInvoice } from '@/services/invoice';
import { PaymentError } from './payment-error';
import { PaymentScreen } from './payment-screen';

export function CaptureScreen() {
  const { flow, startWithPhoto, saveInvoice } = usePaymentFlow();
  const extract = useMutation({ mutationFn: extractInvoice });
  const [imageUri, setImageUri] = useState<string | undefined>(flow.imageUri);

  const readInvoice = () => {
    extract.mutate(
      undefined,
      {
        onSuccess: (invoice) => {
          saveInvoice(invoice);
          router.push('/(payment-flow)/verify');
        },
      },
    );
  };

  async function pick(source: 'camera' | 'library') {
    const launch =
      source === 'camera'
        ? ImagePicker.launchCameraAsync
        : ImagePicker.launchImageLibraryAsync;

    const permission =
      source === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission needed', `Please allow ${source} access to continue.`);
      return;
    }

    const result = await launch({ mediaTypes: ['images'], quality: 0.6 });
    if (result.canceled) return;

    const uri = result.assets[0].uri;
    setImageUri(uri);
    startWithPhoto(uri);
    readInvoice();
  }

  if (extract.isError) {
    return (
      <PaymentScreen>
        <PaymentError
          message={messageForError(extract.error)}
          onRetry={readInvoice}
        />
      </PaymentScreen>
    );
  }

  return (
    <PaymentScreen
      step={1}
      title="Take a picture of the invoice"
      subtitle="Make sure the amount and due date are readable."
      footer={
        <View style={styles.footer}>
          <Button mode="contained" onPress={() => pick('camera')} loading={extract.isPending}>
            {extract.isPending ? 'Reading invoice…' : 'Open camera'}
          </Button>
          <Button mode="text" onPress={() => pick('library')} disabled={extract.isPending}>
            Choose from library
          </Button>
        </View>
      }
    >
      <View style={styles.preview}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
        ) : (
          <Text style={styles.placeholder}>No photo yet</Text>
        )}
      </View>
    </PaymentScreen>
  );
}

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    minHeight: 320,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Brand.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#F5F7F5',
  },
  image: { width: '100%', height: '100%' },
  placeholder: { color: Brand.muted, fontSize: 15 },
  footer: { gap: Spacing.two },
});
