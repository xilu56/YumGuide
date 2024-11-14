import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import ItemDetails from './ItemDetails';
import getColors from '../Helper/colors';

const colors = getColors();
const { primary, white } = colors;

export default function Item({ item }) {
  return (
    <View style={[styles.itemContainer, { backgroundColor: primary }]}>
      {item.url && (
        <Image source={{ uri: item.url }} style={styles.image} />
      )}
      <Text style={[styles.itemName, { color: white }]}>
        {item.name || item.description}
      </Text>
      <ItemDetails
        content={item.quantity && item.unit ? `${item.quantity} ${item.unit}` : `${item.date} ${item.time}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  itemName: {
    fontSize: 12,
    fontWeight: 'bold',
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
});
