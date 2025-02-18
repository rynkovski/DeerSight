import { useAuth } from '@/contexts/AuthContext';
import { categoryQueries } from '@/lib/queries';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';


export type Category = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

export default function CategoriesList() {
  const { session } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    if (!session?.user.id) return;
    
    try {
      setIsLoading(true);
      const data = await categoryQueries.getAll(session.user.id);
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      Alert.alert('Error', 'Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []); 

  const handleDeleteCategory = async (categoryId: string) => {
    Alert.alert(
      'Delete Category',
      'Are you sure you want to delete this category?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoading(true);
              await categoryQueries.delete(categoryId);
              await fetchCategories(); 
            } catch (error) {
              console.error('Error deleting category:', error);
              Alert.alert('Error', 'Failed to delete category');
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Category }) => (
    <View style={styles.categoryItem}>
      <View style={[styles.categoryColor, { backgroundColor: item.color }]}>
        <Text>{item.icon}</Text>
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteCategory(item.id)}
      >
      <Ionicons name='trash' size={24} color='red' />
      </TouchableOpacity>
    </View>
  );

  if (!session) return null;

  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      refreshing={isLoading}
      onRefresh={fetchCategories}
    />
  );
}

const styles = StyleSheet.create({
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoryColor: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    flex: 1,
    fontSize: 16,
  },
  deleteButton: {
    padding: 8,
  },
});