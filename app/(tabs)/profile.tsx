import { useAuth } from '@/contexts/AuthContext';
import { useSignOut } from '@/hooks/useSignOut';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';





export default function ProfileScreen() {
  const signOut = useSignOut();
  const {session} = useAuth();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Profile</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Account Information</Text>
         <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{session?.user.email}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Member Since:</Text>
          <Text style={styles.infoValue}>{session?.user.created_at.slice(0, 10)}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={signOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#f3f3f3",
    padding: 20,
    alignItems: "center",
    borderRadius: 20,
    gap: 10
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  email: {
    fontSize: 16,
    color: "#000",
  },
  infoContainer: {
    backgroundColor: "#f3f3f3",
    margin: 4,
    padding: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: "#666",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },

  button: {
    marginTop: 20,
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})

