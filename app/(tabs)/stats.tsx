import { View, Text, StyleSheet } from "react-native"

export default function StatisticsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistics</Text>
      <View style={styles.chartContainer}>
        <Text style={styles.chartPlaceholder}>Pie Chart Placeholder</Text>
      </View>
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Spending by Category</Text>

      </View>
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
  chartContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    marginBottom: 20,
  },
  chartPlaceholder: {
    fontSize: 18,
    color: "#666",
  },
  statsContainer: {
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

