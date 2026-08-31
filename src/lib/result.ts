export function messageForError(error: unknown): string {
  const appError = error && typeof error === 'object'
    ? (error as { code?: string; message?: string })
    : {};

  switch (appError.code) {
    case 'NETWORK':
      return 'We could not connect. Check your internet connection and try again.';
    case 'TIMEOUT':
      return 'This is taking too long. Please try again.';
    case 'CANCELLED':
      return appError.message ?? 'You cancelled the signing.';
    case 'SERVER':
      if (appError.message?.includes('declined')) return appError.message;
  }

  return 'We could not complete that right now. Please try again.';
}
