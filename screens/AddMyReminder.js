import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Button from '../Components/Button';
import DateTimePicker from '@react-native-community/datetimepicker'; // Ensure this is installed

export default function AddMyReminder({ navigation }) {
  const [reminderDate, setReminderDate] = useState(new Date());
  const [reminderTime, setReminderTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSave = () => {
    // Logic for validation and saving the reminder
    if (!reminderDate || !reminderTime) {
      Alert.alert('Error', 'Please select both a date and time.');
      return;
    }

    // Logic for saving the data locally or to some state can be added here
    Alert.alert('Success', 'Reminder saved successfully!');
    navigation.goBack();
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setReminderDate(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setReminderTime(selectedTime);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Date *</Text>
      <TouchableWithoutFeedback onPress={() => setShowDatePicker(true)}>
        <View style={styles.input}>
          <Text>{reminderDate.toDateString()}</Text>
        </View>
      </TouchableWithoutFeedback>

      {showDatePicker && (
        <DateTimePicker
          value={reminderDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Select Time *</Text>
      <TouchableWithoutFeedback onPress={() => setShowTimePicker(true)}>
        <View style={styles.input}>
          <Text>{reminderTime.toLocaleTimeString()}</Text>
        </View>
      </TouchableWithoutFeedback>

      {showTimePicker && (
        <DateTimePicker
          value={reminderTime}
          mode="time"
          display="default"
          onChange={handleTimeChange}
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
