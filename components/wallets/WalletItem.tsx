import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export type Wallet = {
  id: string;
  name: string;
  balance: number;
  type: 'cash' | 'bank' | 'credit' | 'savings';
};

const getIconName = (type: Wallet['type']) => {
  switch (type) {
    case 'cash':
      return 'money';
    case 'bank':
      return 'bank';
    case 'credit':
      return 'credit-card';
    case 'savings':
      return 'piggy-bank';
    default:
      return 'wallet';
  }
};

const WalletItem = ({ wallet }: { wallet: Wallet }) => {
  return (
    <View style={styles.walletItem}>
      <View style={styles.iconContainer}>
<Ionicons name='wallet-outline' size={24} color='black' />
      </View>
      <View style={styles.walletInfo}>
        <Text style={styles.walletName}>{wallet.name}</Text>
        <Text style={styles.walletType}>{wallet.type}</Text>
      </View>
      <Text style={[styles.walletBalance, wallet.balance < 0 && styles.negativeBalance]}>
        ${wallet.balance.toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  walletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 15,
  },
  walletInfo: {
    flex: 1,
  },
  walletName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  walletType: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
  walletBalance: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  negativeBalance: {
    color: 'red',
  },
});

export default WalletItem;
