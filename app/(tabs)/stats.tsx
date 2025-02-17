import SpendingByCategory from "@/components/stats/SpendingByCategory"
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native"
import { BarChart } from "react-native-chart-kit"


export default function StatisticsScreen() {
  // Sample data for the last 6 months
  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [2500, 3000, 2800, 3200, 2900, 3500],
      },
    ],
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistics</Text>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Monthly Expenses</Text>
        <BarChart
          yAxisSuffix="$"
          data={monthlyData}
          width={Dimensions.get("window").width - 40}
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForBackgroundLines: {
              strokeDasharray: "", // solid background lines
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Spending by Category</Text>
        <SpendingByCategory />
      </View>
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
  chartContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
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

