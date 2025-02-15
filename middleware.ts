// middleware.ts
import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

export function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();
  const { session, isLoading } = useSupabaseAuth();

  useEffect(() => {
    if (isLoading) return;

    const inProtectedRoute = segments[0] === '(tabs)';
    const isAuthenticated = !!session;

    if (!isAuthenticated && inProtectedRoute) {
      // Jeśli użytkownik nie jest zalogowany a próbuje dostać się do chronionej części
      router.push('..');
    } else if (isAuthenticated && !inProtectedRoute) {
      // Jeśli użytkownik jest zalogowany, przekieruj do głównej części aplikacji
      router.push('/(tabs)');
    }
  }, [session, segments, isLoading]);
}