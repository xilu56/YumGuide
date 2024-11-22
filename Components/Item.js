import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import getColors from '../Helper/colors';

const colors = getColors();
const { primary, white } = colors;

export default function Item({ item, type, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor: primary }]}>
      {type === "dishGallery" && (
        <>
          {item.photoUrl ? (
            <Image source={{ uri: item.photoUrl }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )}
          <View style={styles.details}>
            <Text style={[styles.date, { color: white }]}>{item.date || "No Date"}</Text>
          </View>
        </>
      )}

      {type === "ingredients" && (
        <>
          <View style={styles.details}>
            <Text style={[styles.description, { color: white }]}>{item.name}</Text>
          </View>
          <View style={styles.quantityBox}>
            <Text style={styles.quantityText}>
              {item.quantity} {item.unit}
            </Text>
          </View>
        </>
      )}

      {type === "reminder" && (
        <>
          <View style={styles.details}>
            <Text style={[styles.description, { color: white }]}>{item.description}</Text>
          </View>
          <View style={styles.timeBox}>
            <Text style={styles.timeText}>{item.time || "No Time"}</Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  placeholder: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888',
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  quantityBox: {
    backgroundColor: white,
    padding: 8,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 14,
    color: primary,
  },
  timeBox: {
    backgroundColor: white,
    padding: 8,
    borderRadius: 5,
  },
  timeText: {
    fontSize: 14,
    color: primary,
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
