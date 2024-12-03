import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import getColors from '../Helper/colors';
import { useNavigation } from '@react-navigation/native';

const colors = getColors();
const { primary, white, gray, background, cancel } = colors;

export default function Item({ item, type }) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (type === 'ingredients') {
      navigation.navigate('AddEditMyIngredient', {
        isEditing: true,
        ingredient: item,
      });
    } else if (type === 'reminder') {
      navigation.navigate('AddEditMyReminder', {
        isEditing: true,
        reminder: item,
      });
    }
    // Add logic for other types like "dishGallery" if needed
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.container, { backgroundColor: background }]}>
      {type === 'dishGallery' && (
        <>
          {item.photoUrl ? (
            <Image source={{ uri: item.photoUrl }} style={styles.imageLarge} />
          ) : (
            <View style={styles.placeholderLarge}>
              <Ionicons name="image-outline" size={30} color={gray} />
            </View>
          )}
          <View style={styles.details}>
            <Text style={styles.date}>{item.date || 'No Date'}</Text>
          </View>
        </>
      )}

      {type === 'ingredients' && (
        <>
          <View style={styles.details}>
            <Text style={styles.description}>{item.name}</Text>
          </View>
          <View style={styles.quantityBox}>
            <Text style={styles.quantityText}>
              {item.quantity} {item.unit}
            </Text>
          </View>
        </>
      )}

      {type === 'reminder' && (
        <>
          <View style={styles.details}>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          <View style={styles.timeBox}>
            <Text style={styles.timeText}>
              {new Date(`${item.date}T${item.time}`).toLocaleDateString("en-CA")} {item.time}
            </Text>
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
    marginVertical: 2,
    shadowColor: primary,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  imageLarge: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  placeholderLarge: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    color: primary,
    marginBottom: 4,
  },
  quantityBox: {
    backgroundColor: white,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    shadowColor: primary,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  quantityText: {
    fontSize: 14,
    color: primary,
  },
  timeBox: {
    backgroundColor: white,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    shadowColor: cancel,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  timeText: {
    fontSize: 14,
    color: cancel,
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
    color: primary,
  },
});
