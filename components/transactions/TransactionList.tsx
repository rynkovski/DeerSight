import { View, Text, StyleSheet, FlatList } from "react-native"
import { useAuth } from "@/contexts/AuthContext"
import { useEffect, useState } from "react"
import { transactionQueries } from "@/lib/queries"
import { Ionicons } from "@expo/vector-icons"

type Transaction = {
  id: string
  type: "INCOME" | "EXPENSE"
  category_id: string
  amount: number
  date: string
  description: string
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
        <Ionicons
          name={item.type === "INCOME" ? "arrow-up-circle-outline" : "arrow-down-circle-outline"}
          size={24}
          color={item.type === "INCOME" ? "green" : "red"}
        />
      </View>
      <View style={styles.transactionDetails}>

        <Text style={styles.description}>
          {item.description}
        </Text>
        <Text style={styles.date}>{item.date.slice(0, 10)}</Text>
      </View>
      <Text style={[styles.amount, item.type === "INCOME" ? styles.income : styles.expense]}>
       ${item.amount.toFixed(2)}
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
  description: {
    color: "#000",
    fontSize: 16,
    fontWeight: "semibold",
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

