import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, StyleSheet, Pressable, FlatList, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ItemsList from '../Components/ItemsList';

export default function IngredientsScreen({ navigation, route }) {
  const [ingredients, setIngredients] = useState([]);

  // Listen for focus event to refresh the ingredients list
  useEffect(() => {
    if (route.params?.newIngredient) {
      setIngredients(prevIngredients => [...prevIngredients, route.params.newIngredient]);
    }
  }, [route.params?.newIngredient]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 15 }}>
          <Pressable onPress={() => navigation.navigate('AddMyIngredient')} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
            <Ionicons name="add" size={24} color="#ffffff" style={{ marginRight: 5 }} />
          </Pressable>
          <Ionicons name="leaf" size={24} color="#ffffff" />
        </View>
      ),
      headerStyle: { backgroundColor: '#6200ee' },
      headerTintColor: '#ffffff',
    });
  }, [navigation]);

  const handleItemPress = (ingredient) => {
    navigation.navigate('AddMyIngredient', { ingredient });
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => handleItemPress(item)} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
      <View style={styles.item}>
        <Text style={{ color: '#333' }}>{item.name} - {item.quantity} {item.unit}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.screen}>
      <ItemsList items={ingredients} onItemPress={handleItemPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
});
