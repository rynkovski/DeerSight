// components/transactions/TransactionList.tsx
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';

import type { Database } from '@/types/supabase';
import { Text } from '../Themed';

type Transaction = Database['public']['Tables']['transactions']['Row'];

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean; // Dodana właściwość
  onRefresh: () => Promise<void>; // Dodana właściwość
}

export function TransactionList({ 
  transactions, 
  isLoading, 
  onRefresh 
}: TransactionListProps) {
  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.date}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
      <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
    </View>
  );

  return (
    <FlatList
      data={transactions}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={onRefresh}
        />
      }
      ListEmptyComponent={
        <Text style={styles.emptyText}>
          {isLoading ? 'Loading...' : 'No transactions yet'}
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});