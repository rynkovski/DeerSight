import TransactionsList from "@/components/transactions/TransactionList"
import FAB from "@/components/ui/fab"
import { Ionicons } from "@expo/vector-icons"
import { View, Text, StyleSheet } from "react-native"

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Hello,</Text>
      <Text style={styles.title}>user</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>$5,234.56</Text>
      </View>
      <View style={styles.recentTransactions}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <TransactionsList/>
      </View>
         <FAB onPress={() => {}} >
               <Ionicons name={"add"} size={36} color={"#fff"} />
          </FAB>
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
})

