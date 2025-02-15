// app/(tabs)/profile.tsx
import { View, StyleSheet, Button } from 'react-native';

import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { Text } from '@/components/Themed';

export default function ProfileScreen() {
  const { session, signOut } = useSupabaseAuth();

  if (!session) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.email}>{session.user.email}</Text>
      
      <View style={styles.actions}>
        <Button 
          title="Sign Out" 
          onPress={signOut} 
          color="#ff4444"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  actions: {
    marginTop: 'auto',
  },
});