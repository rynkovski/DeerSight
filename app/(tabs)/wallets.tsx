

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import WalletItem, { Wallet } from "@/components/wallets/WalletItem"
import AddWalletModal from "@/components/wallets/AddWalletModal"

const initialWallets: Wallet[] = [
  { id: "1", name: "Cash", balance: 1000, type: "cash" },
  { id: "2", name: "Bank Account", balance: 5000, type: "bank" },
  { id: "3", name: "Credit Card", balance: -500, type: "credit" },
  { id: "4", name: "Savings", balance: 10000, type: "savings" },
]

export default function WalletsScreen() {
  const [wallets, setWallets] = useState<Wallet[]>(initialWallets)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0)

  const handleAddWallet = (newWallet: Omit<Wallet, "id">) => {
    const wallet: Wallet = {
      ...newWallet,
      id: (wallets.length + 1).toString(),
    }
    setWallets([...wallets, wallet])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallets</Text>
      <View style={styles.totalBalanceContainer}>
        <Text style={styles.totalBalanceLabel}>Total Balance</Text>
        <Text style={styles.totalBalanceAmount}>${totalBalance.toFixed(2)}</Text>
      </View>
      <FlatList
        data={wallets}
        renderItem={({ item }) => <WalletItem wallet={item} />}
        keyExtractor={(item) => item.id}
        style={styles.walletList}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
        <FontAwesome name="plus" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Add Wallet</Text>
      </TouchableOpacity>
      <AddWalletModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} onAdd={handleAddWallet} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  totalBalanceContainer: {
    backgroundColor: "#2196F3",
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
    backgroundColor: "#2196F3",
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

