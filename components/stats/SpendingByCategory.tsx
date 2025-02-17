import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

type Category = {
  id: string;
  name: string;
  amount: number;
  color: string;
};

const categories: Category[] = [
  { id: '1', name: 'Food', amount: 500, color: '#FF6384' },
  { id: '2', name: 'Transport', amount: 300, color: '#36A2EB' },
  { id: '3', name: 'Shopping', amount: 400, color: '#FFCE56' },
  { id: '4', name: 'Entertainment', amount: 200, color: '#4BC0C0' },
  { id: '5', name: 'Utilities', amount: 350, color: '#9966FF' },
];

const SpendingByCategory = () => {
  const renderItem = ({ item }: { item: Category }) => (
    <View style={styles.categoryItem}>
      <View style={[styles.categoryColor, { backgroundColor: item.color }]} />
      <Text style={styles.categoryName}>{item.name}</Text>
      <Text style={styles.categoryAmount}>${item.amount}</Text>
    </View>
  );

  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoryColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  categoryName: {
    flex: 1,
    fontSize: 16,
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SpendingByCategory;
