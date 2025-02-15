import { View, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { Text } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';

type Period = 'Expenses' | 'Income';

interface CategoryItem {
  icon: string;
  name: string;
  paymentMethod: string;
  amount: number;
  percentage: number;
  backgroundColor: string;
}

export default function HomeScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('Expenses');

  const categories: CategoryItem[] = [
    {
      icon: 'shirt-outline',
      name: 'Shopping',
      paymentMethod: 'Cash',
      amount: 498.50,
      percentage: 32,
      backgroundColor: '#E8F5E9'
    },
    {
      icon: 'gift-outline',
      name: 'Gifts',
      paymentMethod: 'Card',
      amount: 344.45,
      percentage: 21,
      backgroundColor: '#F5F5F5'
    },
    {
      icon: 'pizza-outline',
      name: 'Food',
      paymentMethod: 'Cash',
      amount: 230.50,
      percentage: 12,
      backgroundColor: '#fcc603'
    }
  ];

  const timeFrames = [
    { period: "Day", amount: 52 },
    { period: "Week", amount: 403 },
    { period: "Month", amount: 1612 }
  ];

  return (
    <View style={styles.container}>
      {/* Balance Section */}
      <View style={styles.header}>
        <Text style={styles.balance}>$32,500.00</Text>
        <Text style={styles.balanceLabel}>Total Balance</Text>
      </View>

      {/* Period Selector */}
      <View style={styles.periodSelector}>
        <Pressable 
          style={[
            styles.periodButton, 
            selectedPeriod === 'Expenses' && styles.periodButtonActive
          ]}
          onPress={() => setSelectedPeriod('Expenses')}
        >
          <Text style={[
            styles.periodButtonText, 
            selectedPeriod === 'Expenses' && styles.periodButtonTextActive
          ]}>
            Expenses
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.periodButton,
            selectedPeriod === 'Income' && styles.periodButtonActive
          ]}
          onPress={() => setSelectedPeriod('Income')}
        >
          <Text style={[
            styles.periodButtonText,
            selectedPeriod === 'Income' && styles.periodButtonTextActive
          ]}>
            Income
          </Text>
        </Pressable>
      </View>

      {/* Statistics Cards */}
      <View style={styles.statsContainer}>
        {timeFrames.map((frame) => (
          <View key={frame.period} style={styles.statsCard}>
            <Text style={styles.statsLabel}>{frame.period}</Text>
            <Text style={styles.statsAmount}>${frame.amount}</Text>
          </View>
        ))}
      </View>

      {/* Categories List */}
      <View style={styles.categoriesList}>
        {categories.map((category) => (
          <View key={category.name} style={styles.categoryItem}>
            <View style={[styles.categoryIcon, { backgroundColor: category.backgroundColor }]}>
              <Ionicons name={category.icon as any} size={24} color="#000" />
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categorySubtitle}>{category.paymentMethod}</Text>
            </View>
            <View style={styles.categoryAmount}>
              <Text style={styles.amount}>${category.amount.toFixed(2)}</Text>
              <Text style={styles.percentage}>{category.percentage}%</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  balance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    padding: 4,
    marginBottom: 24,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#000',
    color: '#fff',
  },
  periodButtonText: {
    color: '#000',
  },
  periodButtonTextActive: {
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 24,
    gap: 8,
  },
  statsCard: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
  },
  statsLabel: {
    fontSize: 14,
    color: '#666',
  },
  statsAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#000',
  },
  categoriesList: {
    flex: 1,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#666',
  },
  categoryAmount: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  percentage: {
    fontSize: 14,
    color: '#666',
  },
});