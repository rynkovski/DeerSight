import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { useAuth } from "@/contexts/AuthContext"
import { useEffect, useState } from "react"
import { transactionQueries } from "@/lib/queries"

type Transaction = {
  id: string
  type: "income" | "expense"
  category: string
  amount: number
  date: string
}



const TransactionsList = () => {
    const {session} = useAuth();

  
     if (!session) return;
  
     const [transactions, setTransactions] = useState<Transaction[]>([]);
  
    useEffect(() => {
      const fetchTransactions = async () => {
        try {
          const data = await transactionQueries.getAll(session.user.id);
          setTransactions(data);
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }
      };
  
      fetchTransactions();
    }, [transactions]);
  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.iconContainer}>
        <FontAwesome
          name={item.type === "income" ? "arrow-circle-up" : "arrow-circle-down"}
          size={24}
          color={item.type === "income" ? "green" : "red"}
        />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={[styles.amount, item.type === "income" ? styles.income : styles.expense]}>
        {item.type === "income" ? "+" : "-"}${item.amount.toFixed(2)}
      </Text>
    </View>
  )

  return  <FlatList
      data={transactions}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.list}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
   listContent: {
    paddingBottom: 80, 
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  iconContainer: {
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  category: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  income: {
    color: "green",
  },
  expense: {
    color: "red",
  },
})

export default TransactionsList

