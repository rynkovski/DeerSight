import { Category } from "@/components/categories/CategoriesList";
import TransactionDrawer from "@/components/transactions/TransactionDrawer";
import TransactionsList from "@/components/transactions/TransactionList"
import { Wallet } from "@/components/wallets/WalletItem";

import { useAuth } from "@/contexts/AuthContext";
import { categoryQueries, walletQueries } from "@/lib/queries";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

export default function HomeScreen() {
 const {session} = useAuth();
   if (!session) return;

  const [isModalVisible, setIsModalVisible] = useState(false)

  const [categories, setCategories] = useState<Category[]>([]);
    const [wallets, setWallets] = useState<Wallet[]>([])
  
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const data = await categoryQueries.getAll(session.user.id);
          setCategories(data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
      const fetchWallets = async () => {
                try {
                  const data = await walletQueries.getAll(session.user.id);
                  setWallets(data);
                } catch (error) {
                  console.error('Error fetching WasetWallets:', error);
                }
              };
          
              fetchWallets();
  
      fetchCategories();
    }, [categories,wallets]);
 
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Hello,</Text>
      <Text style={styles.title}>{session?.user.email}</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>$5,234.56</Text>
      </View>
      <View style={styles.recentTransactions}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <TransactionsList/>
      </View>
 <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
              <Ionicons name="add" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Add Transaction</Text>
      </TouchableOpacity>
            <TransactionDrawer visible={isModalVisible} onClose={() => setIsModalVisible(false)} categories={categories} wallets={wallets}  />
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
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  balanceContainer: {
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  balanceLabel: {
    color: "#fff",
    fontSize: 16,
  },
  balanceAmount: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  recentTransactions: {
    flex:1,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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

