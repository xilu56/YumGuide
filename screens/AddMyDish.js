import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { DishContext } from '../Context/DishContext';
import { addDishWithPhoto } from '../Firebase/firestoreHelper';

export default function AddMyDish({ navigation, route }) {
  const { isEditing, dish } = route.params || {};
  const { addDish } = useContext(DishContext);

  const [photoDate, setPhotoDate] = useState(isEditing && dish ? new Date(dish.date) : new Date());
  const [photoUri, setPhotoUri] = useState(isEditing && dish ? dish.photoUrl : null); // Photo URI state
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Dish' : 'Record Your Dish',
    });
  }, [isEditing, navigation]);

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Camera access is required to take a photo.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 0.7 });
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri); // Save the photo URI
    }
  };

  const handleSave = async () => {
    if (!photoUri) {
      Alert.alert("Error", "Please take a photo before saving.");
      return;
    }

    const dishData = {
      date: photoDate.toDateString(),
      userId: "your-user-id", // Replace this with actual user ID from AuthContext
    };

    try {
      const newDish = await addDishWithPhoto(photoUri, dishData);
      addDish(newDish); // Update local context
      Alert.alert('Success', 'Dish added successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>Take a photo of your dish</Text>

      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.photoPreview} />
      ) : (
        <TouchableOpacity style={styles.photoButton} onPress={handleTakePhoto}>
          <Text style={styles.photoButtonText}>Take a Photo</Text>
        </TouchableOpacity>
      )}

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
            if (selectedDate) setPhotoDate(selectedDate);
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
  photoPreview: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
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
