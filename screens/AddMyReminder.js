import React, { useState, useContext } from 'react';
import { View, Text, Alert, StyleSheet, TouchableWithoutFeedback, TextInput } from 'react-native';
import Button from '../Components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ReminderContext } from '../Context/ReminderContext';

export default function AddMyReminder({ navigation }) {
  const { addReminder } = useContext(ReminderContext);
  const [reminderDate, setReminderDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [description, setDescription] = useState(''); // New state for description

  const handleSave = () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description.');
      return;
    }

    const newReminder = {
      title: "Reminder",
      date: reminderDate.toDateString(),
      description: description.trim(), // Include description in the reminder
    };

    addReminder(newReminder);
    Alert.alert('Success', 'Reminder saved successfully!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description *</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter reminder description"
      />

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
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setReminderDate(selectedDate);
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
