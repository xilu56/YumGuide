import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import Button from '../Components/Button';
import { IngredientContext } from '../Context/IngredientContext';

export default function AddEditMyIngredient({ navigation, route }) {
  const { isEditing, ingredient } = route.params || {};
  const { addIngredient, updateIngredient } = useContext(IngredientContext);
  const [name, setName] = useState(isEditing ? ingredient.name : '');
  const [quantity, setQuantity] = useState(isEditing ? ingredient.quantity : '');
  const [unit, setUnit] = useState(isEditing ? ingredient.unit : '');

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit My Ingredients' : 'Add My Ingredients',
    });
  }, [isEditing, navigation]);

  const handleSave = () => {
    if (name.trim() === '') {
      Alert.alert('Error', 'Please enter an ingredient name.');
      return;
    }

    if (quantity === '' || isNaN(quantity) || parseFloat(quantity) <= 0) {
      Alert.alert('Error', 'Please enter a valid numeric quantity greater than 0.');
      return;
    }

    const newIngredient = { name, quantity, unit };

    if (isEditing) {
      updateIngredient(ingredient.id, newIngredient);
      Alert.alert('Success', 'Ingredient updated successfully!');
    } else {
      addIngredient(newIngredient);
      Alert.alert('Success', 'Ingredient saved successfully!');
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ingredient Name *</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Quantity *</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={quantity} onChangeText={setQuantity} />

      <Text style={styles.label}>Unit</Text>
      <TextInput style={styles.input} value={unit} onChangeText={setUnit} />

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
    padding: 10,
    backgroundColor: '#fff',
  },
  label: {
    marginVertical: 5,
  },
  input: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});
