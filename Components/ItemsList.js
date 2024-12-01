import React from 'react';
import { View, FlatList, StyleSheet, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Item from './Item';
import getColors from '../Helper/colors';

const colors = getColors();

export default function ItemsList({ items, onItemPress, onDeletePress, itemType }) {
  const formattedItems = items.map(item => ({
    ...item,
    date: item.date instanceof Date
    ? item.date.toLocaleDateString("en-CA") 
    : item.date && item.date.seconds
    ? new Date(item.date.seconds * 1000).toLocaleDateString("en-CA")
    : item.date,
  }));

  return (
    <View style={styles.container}>
      <FlatList
        data={formattedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Pressable onPress={() => onItemPress(item)} style={{ flex: 1 }}>
              <Item item={item} type={itemType} />
            </Pressable>
            <Pressable onPress={() => onDeletePress(item.id)} style={styles.deleteButton}>
              <Ionicons name="trash" size={24} color={colors.red} />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: colors.lightGray,
    borderRadius: 5,
  },
  deleteButton: {
    marginLeft: 10,
  },
});
