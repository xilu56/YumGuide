import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import Item from './Item';

export default function ItemsList({ items, onItemPress }) {

  const formattedItems = items.map(item => ({
    ...item,
    date: item.date instanceof Date
      ? item.date.toDateString()
      : item.date && item.date.seconds
      ? new Date(item.date.seconds * 1000).toDateString()
      : item.date,
  }));

  return (
    <View style={styles.container}>
      <FlatList
        data={formattedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => onItemPress(item)}>
            <Item item={item} theme={theme} />
          </Pressable>
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
});