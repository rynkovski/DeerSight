

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from "react-native"

import WalletItem, { Wallet } from "@/components/wallets/WalletItem"
import WalletDrawer from "@/components/wallets/WalletDrawer"
import { useAuth } from "@/contexts/AuthContext"
import { walletQueries } from "@/lib/queries"
import { Ionicons } from "@expo/vector-icons"



export default function WalletsScreen() {
  const {session} = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [wallets, setWallets] = useState<Wallet[]>([])
  if (!session) return;

  const fetchWallets = async () => {
          try {
            const data = await walletQueries.getAll(session.user.id);
            setWallets(data);
          } catch (error) {
            console.error('Error fetching WasetWallets:', error);
          }
        };

  useEffect(() => {
        
    
        fetchWallets();
      }, [wallets]);

  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0)


  return (
    <View style={ styles.container}>
      <Text style={styles.title}>Wallets</Text>
      <View style={styles.totalBalanceContainer}>
        <Text style={styles.totalBalanceLabel}>Total Balance</Text>
        <Text style={styles.totalBalanceAmount}>${totalBalance.toFixed(2)}</Text>
      </View>
      <FlatList
        data={wallets}
        renderItem={({ item }) => <WalletItem wallet={item} fetchWallets={() => {
        fetchWallets();
        }} setIsLoading={() => {}} />}
        keyExtractor={(item) => item.id}
        style={styles.walletList}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
        <Ionicons name="add" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Add Wallet</Text>
      </TouchableOpacity>
      <WalletDrawer visible={isModalVisible} onClose={() => setIsModalVisible(false)}  />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  totalBalanceContainer: {
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  totalBalanceLabel: {
    color: "#fff",
    fontSize: 16,
  },
  totalBalanceAmount: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  walletList: {
    flex: 1,
  },
  addButton: {
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
})

