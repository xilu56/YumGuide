import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import getColors from '../Helper/colors';

const colors = getColors();
const { white, primary } = colors;

export default function ItemDetails({ item }) {
  return (
    <View style={styles.itemDetails}>
      {item.special && (
        <Ionicons
          name="warning"
          size={20}
          color="#FFC107"
          style={styles.warningIcon}
        />
      )}
      <Text style={[styles.itemQuantity, { backgroundColor: white, color: primary }]}>
        {item.quantity} {item.unit}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemQuantity: {
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
  warningIcon: {
    marginRight: 10,
  },
});
