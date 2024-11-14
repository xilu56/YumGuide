import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import getColors from '../Helper/colors';

const colors = getColors();
const { white, primary } = colors;

export default function ItemDetails({ content }) {
  return (
    <View style={styles.itemDetails}>
      <Text style={[styles.itemBox, { backgroundColor: white, color: primary }]}>
        {content}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemBox: {
    padding: 5,
    borderRadius: 5,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
