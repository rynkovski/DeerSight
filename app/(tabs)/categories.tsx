
import CategoryDrawer from "@/components/categories/CategoryDrawer";
import SpendingByCategory from "@/components/categories/CategoriesList";
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

export default function StatisticsScreen() {
   const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <View style={styles.statsContainer}>
        <SpendingByCategory />
      </View>
     <TouchableOpacity style={styles.addButton} onPress={() => setIsDrawerVisible(true)}>
                  <Ionicons name="add" size={20} color="#fff" />
    
            <Text style={styles.addButtonText}>Add Category</Text>
          </TouchableOpacity>
      <CategoryDrawer
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
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
  chartContainer: {
    backgroundColor: "#f3f3f3",
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

