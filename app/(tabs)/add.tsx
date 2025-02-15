// app/(tabs)/add.tsx
import { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import { TextInput, Button } from 'react-native';

import { useRouter } from 'expo-router';
import { useTransactions } from '@/hooks/useTransactions';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import type { Database } from '@/types/supabase';
import { Text } from '@/components/Themed';
import { Picker } from '@react-native-picker/picker';

type Category = Database['public']['Tables']['transactions']['Row']['category'];

export default function AddScreen() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('other');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { session } = useSupabaseAuth();
  const { addTransaction } = useTransactions();

  const handleSubmit = async () => {
    if (!amount || !category || !session) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await addTransaction({
        amount: parseFloat(amount),
        category,
        user_id: session.user.id,
        date: new Date().toISOString(),
      });

      if (success) {
        router.push('/');
      } else {
        Alert.alert('Error', 'Failed to add transaction');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Transaction</Text>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="Amount"
          keyboardType="numeric"
          editable={!isSubmitting}
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(value) => setCategory(value as Category)}
            enabled={!isSubmitting}
          >
            <Picker.Item label="Food" value="food" />
            <Picker.Item label="Transport" value="transport" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        <Button 
          title={isSubmitting ? "Adding..." : "Add Transaction"} 
          onPress={handleSubmit}
          disabled={isSubmitting}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
});