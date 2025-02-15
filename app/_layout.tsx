// app/_layout.tsx
import { Stack } from 'expo-router';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useProtectedRoute } from '@/middleware';
import { useSessionMonitor } from '@/hooks/useSessionMonitor';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Alert } from 'react-native';

export default function RootLayout() {
  const { session, isLoading } = useSupabaseAuth();
  useProtectedRoute();
  useSessionMonitor();

  // Handle loading state
  if (isLoading) {
    return null; // lub komponent loading
  }

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <Stack>
          {!session ? (
            // Przekieruj do logowania jeśli nie ma sesji
            <Stack.Screen 
              name="auth" 
              options={{ headerShown: false }} 
            />
          ) : (
            // Użytkownik zalogowany - pokaż główną aplikację
            <Stack.Screen 
              name="(tabs)" 
              options={{ headerShown: false }} 
            />
          )}
        </Stack>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

// Dodajmy też potrzebny komponent ErrorBoundary
// components/ErrorBoundary.tsx
import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Error caught in boundary:', error);
    Alert.alert('Error', 'Something went wrong. Please try again.');
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Something went wrong. Please restart the app.</Text>
        </View>
      );
    }

    return this.props.children;
  }
}