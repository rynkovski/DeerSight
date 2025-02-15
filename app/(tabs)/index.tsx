// app/(tabs)/index.tsx
import { View, StyleSheet } from 'react-native';

import { TransactionList } from '@/components/transactions/TransactionList';
import { useTransactions } from '@/hooks/useTransactions';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { Text } from '@/components/Themed';

export default function HomeScreen() {
  const { transactions, isLoading, refreshTransactions } = useTransactions();
  const { session } = useSupabaseAuth();

  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome, {session?.user.email}</Text>
        <Text style={styles.total}>
          Total: ${totalAmount.toFixed(2)}
        </Text>
      </View>
      
      <TransactionList 
        transactions={transactions}
        isLoading={isLoading}
        onRefresh={refreshTransactions}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 18,
    marginTop: 8,
  },
});