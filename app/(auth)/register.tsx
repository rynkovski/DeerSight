
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { styles } from './styles';
import { AuthState } from '@/types/auth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authState, setAuthState] = useState<AuthState>({
    loading: false,
    error: null,
  });
  
  const router = useRouter();

  const validateForm = (): string | null => {
    if (!email || !password || !confirmPassword) {
      return 'All fields are required';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return null;
  };

  async function signUpWithEmail() {
    const validationError = validateForm();
    if (validationError) {
      setAuthState(prev => ({ ...prev, error: { message: validationError } }));
      return;
    }

    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { data: { session }, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (!session) {
        Alert.alert('Success', 'Please check your inbox for email verification!');
        router.push('/login');
      } else {
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
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
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

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          editable={!authState.loading}
        />
        
        {authState.error && (
          <Text style={styles.errorText}>{authState.error.message}</Text>
        )}
        
        <TouchableOpacity 
          style={[styles.button, authState.loading && styles.buttonDisabled]}
          onPress={signUpWithEmail}
          disabled={authState.loading}
        >
          <Text style={styles.buttonText}>
            {authState.loading ? 'Creating account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        <Link href="/login" asChild>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}