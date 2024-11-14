import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DishContext } from '../Context/DishContext';

export default function AddMyDish({ navigation, route }) {
  const { isEditing, dish } = route.params || {};
  const { addDish, updateDish } = useContext(DishContext);

  const [photoDate, setPhotoDate] = useState(isEditing && dish ? new Date(dish.date) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Dish' : 'Record Your Dish',
    });
  }, [isEditing, navigation]);

  const handleSave = async () => {
    const newDishData = { date: photoDate.toDateString() };

    if (isEditing) {
      updateDish(dish.id, newDishData);
      Alert.alert('Success', 'Dish updated successfully!');
    } else {
      await addDish(newDishData);
      Alert.alert('Success', 'Dish added successfully!');
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>Please take a photo of your dish</Text>
      
      <TouchableOpacity style={styles.photoButton}>
        <Text style={styles.photoButtonText}>Take a Photo</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Select Date *</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
      <Text>{photoDate.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={photoDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setPhotoDate(selectedDate);
            }
          }}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={() => navigation.goBack()} />
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  photoButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    marginBottom: 30,
  },
  photoButtonText: {
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  datePicker: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 30,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
