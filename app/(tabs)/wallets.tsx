import { View, Text, StyleSheet, FlatList } from "react-native"

const wallets = [
  { id: "1", name: "Cash", balance: 1000 },
  { id: "2", name: "Bank Account", balance: 5000 },
  { id: "3", name: "Credit Card", balance: -500 },
]

export default function WalletsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallets</Text>
      <FlatList
        data={wallets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.walletItem}>
            <Text style={styles.walletName}>{item.name}</Text>
            <Text style={[styles.walletBalance, item.balance < 0 && styles.negativeBalance]}>
              ${item.balance.toFixed(2)}
            </Text>
          </View>
        )}
      />
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
  walletItem: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  walletName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  walletBalance: {
    fontSize: 18,
    color: "green",
  },
  negativeBalance: {
    color: "red",
  },
})

