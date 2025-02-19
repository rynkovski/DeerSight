import { useAuth } from '@/contexts/AuthContext';
import { walletQueries } from '@/lib/queries';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';


export type Wallet = {
  id: string;
  name: string;
  balance: number;
  type: 'cash' | 'bank' | 'credit' | 'savings';
  currency: 'usd' | 'eur' | 'pln';
  icon: string;
};



const WalletItem = ({ wallet,fetchWallets,setIsLoading }: { wallet: Wallet, fetchWallets: () => void,setIsLoading: (isLoading: boolean) => void }) => {

  function renderCurrency(currency: Wallet['currency']): string {
  switch (currency) {
    case 'usd':
      return '$';
    case 'eur':
      return '€';
    case 'pln':
      return 'zł';
    default:
      return '';
  }
}



const handleDeleteWallet = async (walletId: string) => {
    Alert.alert(
      'Delete Wallet',
      'Are you sure you want to delete this wallet?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoading(true);
              await walletQueries.delete(walletId);
              await fetchWallets(); 
            } catch (error) {
              console.error('Error deleting wallet:', error);
              Alert.alert('Error', 'Failed to delete wallet');
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };
  return (
    <View style={styles.walletItem}>
      <View style={styles.iconContainer}>
<Ionicons name='wallet-outline' size={24} color='black' />
      </View>
      <View style={styles.walletInfo}>
        <Text style={styles.walletName}>{wallet.name}</Text>
      </View>
      <Text style={[styles.walletBalance, wallet.balance < 0 && styles.negativeBalance]}>
     {wallet.balance.toFixed(2)}  {renderCurrency(wallet.currency)}
      </Text>
         <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteWallet(wallet.id)}
            >
            <Ionicons name='trash' size={24} color='red' />
            </TouchableOpacity>
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
   deleteButton: {
    padding: 8,
  },
});

export default WalletItem;
