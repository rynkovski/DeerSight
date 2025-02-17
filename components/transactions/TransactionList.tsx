import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native"
import { FontAwesome } from "@expo/vector-icons"

type Transaction = {
  id: string
  type: "income" | "expense"
  category: string
  amount: number
  date: string
}

const transactions: Transaction[] = [
  { id: "1", type: "expense", category: "Food", amount: 25.5, date: "2023-04-15" },
  { id: "2", type: "income", category: "Salary", amount: 3000, date: "2023-04-01" },
  { id: "3", type: "expense", category: "Transport", amount: 50, date: "2023-04-10" },
  { id: "4", type: "expense", category: "Shopping", amount: 100, date: "2023-04-05" },
  { id: "5", type: "income", category: "Freelance", amount: 500, date: "2023-04-20" },
]

const TransactionsList = () => {
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
    paddingBottom: 80, // Space for FAB
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

