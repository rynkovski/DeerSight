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
import type { Database } from '@/types/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { transactionQueries } from '@/lib/queries';

type Transaction = Database['public']['Tables']['transactions']['Row'];
type TransactionInsert = Omit<Transaction, 'id' | 'created_at' | 'user_id'>;

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface Wallet {
  id: string;
  name: string;
  icon: string;
}

type TransactionDrawerProps = {
  visible: boolean;
  onClose: () => void;
  categories: Category[];
  wallets: Wallet[];
};

export default function TransactionDrawer({ 
  visible, 
  onClose, 
  categories,
  wallets 
}: TransactionDrawerProps) {
  const { session } = useAuth();
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState<'EXPENSE' | 'INCOME'>('EXPENSE');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedWallet, setSelectedWallet] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!session) return;
    if (!amount || isNaN(Number(amount))) {
      setError('Valid amount is required');
      return;
    }
    if (!selectedCategory) {
      setError('Category is required');
      return;
    }
    if (!selectedWallet) {
      setError('Wallet is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const newTransaction: TransactionInsert = {
        amount: Number(amount) * (type === 'EXPENSE' ? -1 : 1),
        description: note,
        date: date.toISOString(),
        category_id: selectedCategory,
        wallet_id: selectedWallet,
        type: type,
      };

      await transactionQueries.create(session.user.id, newTransaction);


      setAmount('');
      setNote('');
      setDate(new Date());
      setType('EXPENSE');
      setSelectedCategory('');
      setSelectedWallet('');
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create transaction');
    } finally {
      setIsLoading(false);
    }
  };

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
            <Text style={styles.title}>Add Transaction</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form}>
            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}


            <View style={styles.typeContainer}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === 'EXPENSE' && styles.typeButtonActive,
                ]}
                onPress={() => setType('EXPENSE')}
              >
                <Text style={[
                  styles.typeButtonText,
                  type === 'EXPENSE' && styles.typeButtonTextActive,
                ]}>Expense</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === 'INCOME' && styles.typeButtonActive,
                ]}
                onPress={() => setType('INCOME')}
              >
                <Text style={[
                  styles.typeButtonText,
                  type === 'INCOME' && styles.typeButtonTextActive,
                ]}>Income</Text>
              </TouchableOpacity>
            </View>


            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="Enter amount"
              keyboardType="numeric"
            />


            <Text style={styles.label}>Note</Text>
            <TextInput
              style={styles.input}
              value={note}
              onChangeText={setNote}
              placeholder="Add a note"
              multiline
            />


            <Text style={styles.label}>Category</Text>
            <ScrollView horizontal style={styles.categoryContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryItem,
                    { backgroundColor: category.color },
                    selectedCategory === category.id && styles.selectedCategory,
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>


            <Text style={styles.label}>Wallet</Text>
            <ScrollView horizontal style={styles.walletContainer}>
              {wallets.map((wallet) => (
                <TouchableOpacity
                  key={wallet.id}
                  style={[
                    styles.walletItem,
                    selectedWallet === wallet.id && styles.selectedWallet,
                  ]}
                  onPress={() => setSelectedWallet(wallet.id)}
                >
                  <Text style={[styles.walletName,  selectedWallet === wallet.id && styles.selectedWalletName]}>{wallet.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>


            <TouchableOpacity
              style={[
                styles.createButton,
                isLoading && styles.createButtonDisabled,
              ]}
              onPress={handleCreate}
              disabled={isLoading}
            >
              <Text style={styles.createButtonText}>
                {isLoading ? 'Creating...' : 'Add Transaction'}
              </Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    color: 'red',
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
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#000',
  },
  typeButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  dateButton: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#000',
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  categoryItem: {
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
    minWidth: 80,
  },
  selectedCategory: {
    borderWidth: 2,
    borderColor: '#000',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
  walletContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  walletItem: {
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#f5f5f5',

    minWidth: 80,
  },
  selectedWallet: {
    backgroundColor: '#000',
  },

  walletName: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  selectedWalletName: {
    color: '#fff',
  },
  createButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});