// app/(auth)/register.tsx
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { styles } from './styles';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const { signUp, error: authError, loading } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      setValidationError('All fields are required');
      return false;
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return false;
    }

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('Please enter a valid email');
      return false;
    }

    setValidationError(null);
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    const success = await signUp(email, password);
    if (success) {
      // Show success message about email verification
      alert('Please check your email to verify your account');
      router.replace('/login');
    }
  };

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
          onChangeText={(text) => {
            setEmail(text);
            setValidationError(null);
          }}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!loading}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setValidationError(null);
          }}
          secureTextEntry
          editable={!loading}
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setValidationError(null);
          }}
          secureTextEntry
          editable={!loading}
        />
        
        {validationError && <Text style={styles.errorText}>{validationError}</Text>}
        {authError && <Text style={styles.errorText}>{authError}</Text>}
        
        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Creating account...' : 'Create Account'}
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