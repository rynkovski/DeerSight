
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { LoadingScreen } from '@/components/LoadingScreen';

function AuthMiddleware() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

  const firstSegment = segments[0];

    // Check if we're in the auth group
    const inAuthGroup = firstSegment === '(auth)';
    // Check if we're at the root/welcome screen
    const inWelcomeScreen = !firstSegment 

    // Allow access to welcome screen regardless of auth state
    if (inWelcomeScreen) return;

    if (!session && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (session && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [session, loading, segments]);

  if (loading) {
    return <LoadingScreen />;
  }

  return null;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <AuthMiddleware />
        <Stack 
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'white' }
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </AuthProvider>
  );
}