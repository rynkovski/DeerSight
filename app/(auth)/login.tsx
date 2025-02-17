
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { styles } from './styles';
import { AuthState } from '@/types/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authState, setAuthState] = useState<AuthState>({
    loading: false,
    error: null,
  });
  
  const router = useRouter();

  async function signInWithEmail() {
    if (!email || !password) {
      setAuthState(prev => ({
        ...prev,
        error: { message: 'Please enter both email and password' }
      }));
      return;
    }

    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { error, data: { session } } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (session) {
        router.push('/(tabs)');
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: { message: (error as Error).message }
      }));
    } finally {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!authState.loading}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!authState.loading}
        />
        
        {authState.error && (
          <Text style={styles.errorText}>{authState.error.message}</Text>
        )}
        
        <TouchableOpacity 
          style={[styles.button, authState.loading && styles.buttonDisabled]}
          onPress={signInWithEmail}
          disabled={authState.loading}
        >
          <Text style={styles.buttonText}>
            {authState.loading ? 'Signing in...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        <Link href="/register" asChild>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>
              Don't have an account? Create one
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}