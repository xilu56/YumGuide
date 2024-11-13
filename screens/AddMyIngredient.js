import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Button from '../Components/Button';

export default function AddMyIngredient({ navigation }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');

  const handleSave = () => {
    if (name.trim() === '') {
      Alert.alert('Error', 'Please enter an ingredient name.');
      return;
    }

    if (quantity === '' || isNaN(quantity) || parseFloat(quantity) <= 0) {
      Alert.alert('Error', 'Please enter a valid numeric quantity greater than 0.');
      return;
    }

    // Logic for saving the data locally or to some state can be added here
    Alert.alert('Success', 'Ingredient saved successfully!');
    navigation.goBack();
  };


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ingredient Name *</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Quantity *</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />

      <Text style={styles.label}>Unit</Text>
      <TextInput
        style={styles.input}
        value={unit}
        onChangeText={setUnit}
      />

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
  datePicker: {
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
