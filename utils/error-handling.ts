// utils/error-handling.ts
import { Alert } from 'react-native';

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 400
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: unknown) => {
  if (error instanceof AppError) {
    Alert.alert('Error', error.message);
  } else if (error instanceof Error) {
    Alert.alert('Error', error.message);
  } else {
    console.error('Unexpected error:', error);
    Alert.alert('Error', 'An unexpected error occurred');
  }
};