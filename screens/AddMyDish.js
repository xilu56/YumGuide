import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Button from '../Components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddMyDish({ navigation }) {
  const [photo, setPhoto] = useState('');
  const [photoDate, setPhotoDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    if (photo.trim() === '') {
      Alert.alert('Error', 'Please enter a photo name or path.');
      return;
    }

    // Logic for saving the data locally or to some state can be added here
    Alert.alert('Success', 'Dish photo saved successfully!');
    navigation.goBack();
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || photoDate;
    setShowDatePicker(false);
    setPhotoDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Photo Name/Path *</Text>
      <TextInput
        style={styles.input}
        value={photo}
        onChangeText={setPhoto}
      />

      <Text style={styles.label}>Photo Date</Text>
      <TouchableWithoutFeedback onPress={() => setShowDatePicker(true)}>
        <View style={styles.input}>
          <Text>{photoDate.toDateString()}</Text>
        </View>
      </TouchableWithoutFeedback>

      {showDatePicker && (
        <DateTimePicker
          value={photoDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
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
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
