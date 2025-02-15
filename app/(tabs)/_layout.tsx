// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from '@/components/Themed';

export default function TabLayout() {
 const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: 'white' }}>
    <Tabs screenOptions={{
      headerShown: false, // This will hide the header
      tabBarStyle: {
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
        backgroundColor: '#fff',
         height: Platform.select({
          ios: 40 + insets.bottom, // Adjust height for iOS devices with safe area
          android: 60,
        }),
        paddingTop: 8,
        paddingBottom: Platform.select({
          ios: insets.bottom + 8, // Add safe area padding for iOS
          android: 8,
        }),
      
        

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
    </View>
  );
}