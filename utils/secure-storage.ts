// utils/secure-storage.ts
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const secureStorage = {
  async setItem(key: string, value: string) {
    if (Platform.OS === 'web') {
      // Dla web używamy sessionStorage zamiast localStorage
      sessionStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },

  async getItem(key: string) {
    if (Platform.OS === 'web') {
      return sessionStorage.getItem(key);
    }
    return SecureStore.getItemAsync(key);
  },

  async removeItem(key: string) {
    if (Platform.OS === 'web') {
      sessionStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  },
};