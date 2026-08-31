import { z } from 'zod';

import { config, endpoints } from '@/constants/config';
import { addDays, isValidDate } from '@/lib/dates';

export const InvoiceSchema = z.object({
  receiverName: z.string().min(1),
  amountMinor: z.number().int().positive(),
  dueDate: z.string(),
  ocrReference: z.string(),
});

export type Invoice = z.infer<typeof InvoiceSchema>;

export type InvoiceEdits = {
  receiverName?: string;
  amountKronor?: number;
  dueDate?: string;
};

export type EffectiveInvoice = {
  receiverName: string;
  amountKronor: number;
  amountMinor: number;
  dueDate: string;
  ocrReference: string;
};

const InvoiceFormSchema = z.object({
  receiverName: z.string().trim().min(1, 'Enter who to pay.'),
  amountKronor: z.number().positive('Enter an amount greater than 0.'),
  dueDate: z.string().refine(isValidDate, 'Enter a valid date (YYYY-MM-DD).'),
});

export type InvoiceErrors = Partial<Record<keyof z.infer<typeof InvoiceFormSchema>, string>>;

export function mockInvoice(): Invoice {
  return {
    receiverName: 'Tele2 AB',
    amountMinor: 1_915_700,
    dueDate: addDays(10),
    ocrReference: '1234567890123',
  };
}

export async function extractInvoice(): Promise<Invoice> {
  const response = await fetch(config.apiBaseUrl + endpoints.extractInvoice);
  if (!response.ok) throw new Error('Could not read invoice.');

  // endpoint returns a string, so use a typed local invoice for this MVP.
  return InvoiceSchema.parse(mockInvoice());
}

export function effectiveInvoice(invoice: Invoice, edits: InvoiceEdits = {}): EffectiveInvoice {
  const amountKronor = edits.amountKronor ?? invoice.amountMinor / 100;

  return {
    receiverName: edits.receiverName ?? invoice.receiverName,
    amountKronor,
    amountMinor: Math.round(amountKronor * 100),
    dueDate: edits.dueDate ?? invoice.dueDate,
    ocrReference: invoice.ocrReference,
  };
}

export function validate(invoice: EffectiveInvoice): InvoiceErrors {
  const result = InvoiceFormSchema.safeParse(invoice);
  if (result.success) return {};

  const fields = result.error.flatten().fieldErrors;
  return {
    receiverName: fields.receiverName?.[0],
    amountKronor: fields.amountKronor?.[0],
    dueDate: fields.dueDate?.[0],
  };
}

export const isValid = (errors: InvoiceErrors) => Object.keys(errors).length === 0;
