// middleware.ts
import { useEffect } from 'react';
import { Redirect, useRootNavigationState, useSegments } from 'expo-router';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

// Grupy ścieżek wymagające autoryzacji
const PROTECTED_SEGMENTS = ['(tabs)'];

export function useProtectedRoute() {
  const segments = useSegments();
  const { session, isLoading } = useSupabaseAuth();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key || isLoading) return;

    const inProtectedRoute = PROTECTED_SEGMENTS.includes(segments[0]);

    if (!session && inProtectedRoute) {
      // Przekieruj do logowania jeśli użytkownik próbuje dostać się do chronionej ścieżki
      return <Redirect href="/auth" />;
    }

    if (session && !inProtectedRoute) {
      // Przekieruj do głównej aplikacji jeśli użytkownik jest zalogowany
      return <Redirect href="/(tabs)" />;
    }
  }, [session, segments, navigationState?.key]);

  return null;
}