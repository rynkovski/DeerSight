// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {


  return (
    <Tabs screenOptions={{
      headerShown: false, // This will hide the header
      tabBarStyle: {
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
        backgroundColor: '#fff',
        height: 60,
        paddingTop: 8,
        paddingBottom: 8,
      },
      tabBarActiveTintColor: '#000',
      tabBarInactiveTintColor: '#666',
      tabBarShowLabel: false,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused? "home" : "home-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused? "stats-chart" : "stats-chart-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallets"
        options={{
          title: 'Wallets',
          tabBarIcon: ({ color, size,focused }) => (
            <Ionicons name={focused? "wallet" : "wallet-outline"} size={size} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size , focused}) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}