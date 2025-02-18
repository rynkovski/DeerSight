import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { categoryQueries } from '@/lib/queries';
import { Ionicons } from '@expo/vector-icons';

import type { Database } from '@/types/supabase';
import { useAuth } from '@/contexts/AuthContext';


type CategoryRow = Database['public']['Tables']['categories']['Row'];
type CategoryInsert = Database['public']['Tables']['categories']['Insert'];

const CATEGORY_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
  '#FFEEAD', '#D4A5A5', '#9B5DE5', '#00BBF9'
];

const CATEGORY_ICONS = [
  '🛒', '🚗', '🏠', '🎮', '🍽️', '💊', 
  '🎓', '✈️', '🎭', '💼', '🏋️', '🎁'
];

type CategoryDrawerProps = {
  visible: boolean;
  onClose: () => void;
};

export default function CategoryDrawer({ visible, onClose }: CategoryDrawerProps) {
  const { session } = useAuth();
  const [name, setName] = useState('');
  const [type, setType] = useState<CategoryRow['type']>('EXPENSE');
  const [selectedColor, setSelectedColor] = useState(CATEGORY_COLORS[0]);
  const [selectedIcon, setSelectedIcon] = useState(CATEGORY_ICONS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!session) return;
    if (!name.trim()) {
      setError('Category name is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const newCategory: CategoryInsert = {
        user_id: session.user.id,
        name: name.trim(),
        type,
        color: selectedColor,
        icon: selectedIcon,
      };

      await categoryQueries.create(session.user.id, newCategory);

      // Reset form
      setName('');
      setType('EXPENSE');
      setSelectedColor(CATEGORY_COLORS[0]);
      setSelectedIcon(CATEGORY_ICONS[0]);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create category');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>

          <View style={styles.header}>
            <Text style={styles.title}>Create Category</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
<Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form}>

            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}


            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Category name"

            />
            <Text style={styles.label}>Type</Text>
            <View style={styles.typeContainer}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === 'EXPENSE' && styles.typeButtonActive,
                ]}
                onPress={() => setType('EXPENSE')}
              >
                <Text style={[
                  styles.typeButtonText,
                  type === 'EXPENSE' && styles.typeButtonTextActive,
                ]}>Expense</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === 'INCOME' && styles.typeButtonActive,
                ]}
                onPress={() => setType('INCOME')}
              >
                <Text style={[
                  styles.typeButtonText,
                  type === 'INCOME' && styles.typeButtonTextActive,
                ]}>Income</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Color</Text>
            <View style={styles.colorGrid}>
              {CATEGORY_COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorItem,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedColor,
                  ]}
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </View>
            <Text style={styles.label}>Icon</Text>
            <View style={styles.iconGrid}>
              {CATEGORY_ICONS.map((icon) => (
                <TouchableOpacity
                  key={icon}
                  style={[
                    styles.iconItem,
                    selectedIcon === icon && styles.selectedIcon,
                  ]}
                  onPress={() => setSelectedIcon(icon)}
                >
                  <Text style={styles.iconText}>{icon}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={[
                styles.createButton,
                isLoading && styles.createButtonDisabled,
              ]}
              onPress={handleCreate}
              disabled={isLoading}
            >
              <Text style={styles.createButtonText}>
                {isLoading ? 'Creating...' : 'Create Category'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor:"#e0e0e0",
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: "#000",
  },
  closeButton: {
    padding: 4,
  },
  form: {
    padding: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 12,
    fontSize: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: "#000",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
     color: "#000",
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
      backgroundColor: "#e0e0e0",

    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: "#000",
  },
  typeButtonText: {
    fontSize: 16,
     color: "#000",

    fontWeight: '500',
  },
  typeButtonTextActive: {
     color: "#fff",

  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  colorItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: "black"
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  iconItem: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "gray",
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIcon: {
    backgroundColor:"black",
  },
  iconText: {
    fontSize: 20,
  },
  createButton: {
    backgroundColor: "black",
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: '600',
  },
});
