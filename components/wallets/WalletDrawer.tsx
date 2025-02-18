import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '@/contexts/AuthContext';
import { Database } from '@/types/supabase';
import { walletQueries } from '@/lib/queries';

type WalletInsert = Database['public']['Tables']['wallets']['Insert'];

export type Wallet = {
  id: string;
  name: string;
  balance: number;
  type: 'cash' | 'bank' | 'credit' | 'savings';
  currency: 'usd' | 'eur' | 'pln';
};

type WalletDrawerProps = {
  visible: boolean;
  onClose: () => void;
};

export default function WalletDrawer({ visible, onClose }: WalletDrawerProps) {
    const { session } = useAuth();
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [type, setType] = useState<Wallet['type']>('cash');
  const [currency, setCurrency] = useState<Wallet['currency']>('usd');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  

  const handleAdd = async() => {
    if (!session) return;
    if (!name.trim()) {
      setError('Wallet name is required');
      return;
    }

    setIsLoading(true);

    if (!balance || isNaN(Number(balance))) {
      setError('Valid balance is required');
      return;
    }
try{


  const newWallet: WalletInsert= {
    user_id: session.user.id,
    name: name.trim(),
    balance: Number(balance),
currency: currency
  };
await walletQueries.create(session.user.id, newWallet);


    setName('');
    setBalance('');
    setType('cash');
    setCurrency('usd');
    setError(null);
    onClose();
} catch (err) {
  console.error('Error adding wallet:', err);
  setError('An error occurred while adding the wallet');
}finally{
  setIsLoading(false);
  }
}
  

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>

          <View style={styles.header}>
            <Text style={styles.title}>Add New Wallet</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form}>

            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}


            <Text style={styles.label}>Wallet Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter wallet name"
            />


            <Text style={styles.label}>Initial Balance</Text>
            <TextInput
              style={styles.input}
              value={balance}
              onChangeText={setBalance}
              placeholder="Enter initial balance"
              keyboardType="numeric"
            />


            <Text style={styles.label}>Wallet Currency</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={currency}
                onValueChange={(itemValue) => setCurrency(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="$" value="usd" />
                <Picker.Item label="€" value="eur" />
                <Picker.Item label="zł" value="pln" />
              </Picker>
            </View>
            <Text style={styles.label}>Wallet Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={type}
                onValueChange={(itemValue) => setType(itemValue as Wallet['type'])}
                style={styles.picker}
              >
                <Picker.Item label="Cash" value="cash" />
                <Picker.Item label="Bank" value="bank" />
                <Picker.Item label="Credit" value="credit" />
                <Picker.Item label="Savings" value="savings" />
              </Picker>
            </View>

            {/* Add button */}
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAdd}
              disabled={isLoading}
            >
              <Text style={styles.addButtonText}> {isLoading ? 'Adding...' : 'Add Wallet'}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  closeButton: {
    padding: 4,
  },
  form: {
    padding: 16,
  },
  errorText: {
    color: '#ff0000',
    marginBottom: 12,
    fontSize: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  pickerContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: 4,
  },
  picker: {
    marginHorizontal: -4,
  },
  addButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});