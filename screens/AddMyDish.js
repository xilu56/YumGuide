import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addPhoto } from '../Firebase/firestoreHelper';

export default function AddMyDish({ navigation }) {
  const [photoDate, setPhotoDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    try {
      const photoData = { date: photoDate.toDateString() };

      const docId = await addPhoto('test.png', photoData);

      if (docId) {
        Alert.alert('Success', 'Dish photo saved successfully!');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to upload photo.');
      }
    } catch (err) {
      console.error("Error saving dish photo:", err);
      Alert.alert('Error', 'An error occurred while saving the photo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Photo Date</Text>
      <Text onPress={() => setShowDatePicker(true)} style={styles.dateText}>
        {photoDate.toDateString()}
      </Text>
      
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
        <Button title="Cancel" onPress={() => navigation.goBack()} color="#6A0DAD" />
        <Button title="Save" onPress={handleSave} color="#FFD700" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  dateText: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
