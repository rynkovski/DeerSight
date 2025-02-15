import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Auth guard component
function AuthGuard() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      // Redirect to the sign-in page if not signed in
      router.replace('/welcome');
    } else if (user && inAuthGroup) {
      // Redirect to the home page if signed in
      router.replace('/(tabs)');
    }
  }, [user, loading, segments]);

  return null;
}

export default function RootLayout() {
  return (
  
       <SafeAreaProvider>
      <AuthProvider>
      <AuthGuard />

        <Stack screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' }
        }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}