import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import Button from "../Components/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ReminderContext } from "../Context/ReminderContext";
import { NotificationContext } from "../Context/NotificationContext";
import getColors from "../Helper/colors";

const colors = getColors();

export default function AddEditMyReminder({ navigation, route }) {
  const { isEditing, reminder } = route.params || {};
  const { addReminder, updateReminder } = useContext(ReminderContext);
  const { scheduleNotification } = useContext(NotificationContext);

  const initialDate = isEditing && reminder.date ? new Date(reminder.date) : new Date();
  const initialTime = isEditing && reminder.time ? reminder.time : "12:00";

  const [reminderDate, setReminderDate] = useState(initialDate);
  const [reminderTime, setReminderTime] = useState(initialTime);
  const [description, setDescription] = useState(isEditing ? reminder.description : "");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Reminder" : "Add Reminder",
    });
  }, [isEditing, navigation]);

  const handleSave = async () => {
    if (!description.trim()) {
      Alert.alert("Error", "Please enter a description.");
      return;
    }

    const newReminder = {
      title: "Reminder",
      date: reminderDate.toLocaleDateString("en-CA"), // Saves in "YYYY-MM-DD" format in local time zone
      time: reminderTime,
      description: description.trim(),
    };    

    const notificationTime = new Date(reminderDate); 
    notificationTime.setHours(
      parseInt(reminderTime.split(":")[0]), 
      parseInt(reminderTime.split(":")[1])
    );

    if (notificationTime <= new Date()) {
      Alert.alert("Error", "Reminder time must be in the future.");
      return;
    }

    if (isEditing) {
      updateReminder(reminder.id, newReminder);
      Alert.alert("Success", "Reminder updated successfully!");
    } else {
      addReminder(newReminder);
      Alert.alert("Success", "Reminder saved successfully!");
    }

    try {
      await scheduleNotification("Reminder Alert", description.trim(), notificationTime);
    } catch (err) {
      console.error("Error scheduling notification:", err);
    }

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

      <Text style={styles.label}>Select Time *</Text>
      <TouchableWithoutFeedback onPress={() => setShowTimePicker(true)}>
        <View style={styles.input}>
          <Text>{reminderTime}</Text>
        </View>
      </TouchableWithoutFeedback>

      {showTimePicker && (
        <DateTimePicker
          value={new Date(
            `${reminderDate.toISOString().split("T")[0]}T${reminderTime}:00`
          )}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              const hours = selectedTime.getHours().toString().padStart(2, "0");
              const minutes = selectedTime.getMinutes().toString().padStart(2, "0");
              setReminderTime(`${hours}:${minutes}`);
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
    backgroundColor: colors.lightGray,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    color: colors.darkGray,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 5,
    padding: 10,
    backgroundColor: colors.lightGray,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
