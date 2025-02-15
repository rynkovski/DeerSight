// app/auth/register.tsx
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

import { useRouter } from 'expo-router';
import { Text } from '@/components/Themed';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useSupabaseAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const { error } = await signUp(email, password);
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert(
          'Success', 
          'Registration successful! Please check your email to verify your account.',
          [
            {
              text: 'OK',
              onPress: () => router.push('./')
            }
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password-new"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Create Account"
          onPress={handleRegister}
        />
      </View>

      <View style={styles.linkContainer}>
        <Button
          title="Already have an account? Sign in"
          onPress={() => router.push('./')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  buttonContainer: {
    marginBottom: 15,
  },
  linkContainer: {
    marginTop: 10,
  },
});