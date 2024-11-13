import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ItemsList from '../Components/ItemsList';
import getColors from '../Helper/colors';

const colors = getColors();

export default function DishGalleryScreen({ navigation, route }) {
  const [dishes, setDishes] = useState([]);

  // Listen for focus event to refresh the dish gallery list
  useEffect(() => {
    if (route.params?.newDish) {
      setDishes(prevDishes => [...prevDishes, route.params.newDish]);
    }
  }, [route.params?.newDish]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 15 }}>
          <Pressable onPress={() => navigation.navigate('AddMyDish')} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
            <Ionicons name="add" size={24} color={colors.white} style={{ marginRight: 5 }} />
          </Pressable>
          <Ionicons name="image" size={24} color={colors.white} />
        </View>
      ),
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.white,
    });
  }, [navigation]);

  const handleItemPress = (dish) => {
    navigation.navigate('AddMyDish', { dish });
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => handleItemPress(item)} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
      <View style={styles.item}>
        <Text style={{ color: colors.text }}>{item.name} - {item.quantity} {item.unit}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.screen}>
      <ItemsList items={dishes} onItemPress={handleItemPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background,
  },
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: colors.gray,
    borderRadius: 5,
  },
});
