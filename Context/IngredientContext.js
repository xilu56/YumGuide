import React, { createContext, useState, useEffect } from 'react';
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { database } from '../Firebase/firebaseSetup';

export const IngredientContext = createContext();

export const IngredientProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);

  // Fetch ingredients from Firestore
  const getIngredients = async () => {
    try {
      const querySnapshot = await getDocs(collection(database, "MyIngredients"));
      const ingredientList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIngredients(ingredientList);
    } catch (err) {
      console.error("Error fetching ingredients:", err);
    }
  };

  // Add ingredient to Firestore and update local state
  const addIngredient = async (ingredient) => {
    try {
      const docRef = await addDoc(collection(database, "MyIngredients"), ingredient);
      setIngredients([...ingredients, { id: docRef.id, ...ingredient }]);
    } catch (err) {
      console.error("Error adding ingredient:", err);
    }
  };

  // Update ingredient in Firestore and update local state
  const updateIngredient = async (id, updatedIngredient) => {
    try {
      const ingredientRef = doc(database, "MyIngredients", id);
      await updateDoc(ingredientRef, updatedIngredient);
      setIngredients(ingredients.map(ingredient =>
        ingredient.id === id ? { ...ingredient, ...updatedIngredient } : ingredient
      ));
    } catch (err) {
      console.error("Error updating ingredient:", err);
    }
  };
  // Delete ingredient from Firestore and update local state
  const deleteIngredient = async (id) => {
    try {
      const ingredientRef = doc(database, "MyIngredients", id);
      await deleteDoc(ingredientRef);
      setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
    } catch (err) {
      console.error("Error deleting ingredient:", err);
    }
  };
  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <IngredientContext.Provider value={{ ingredients, addIngredient, updateIngredient, deleteIngredient }}>
      {children}
    </IngredientContext.Provider>
  );
};