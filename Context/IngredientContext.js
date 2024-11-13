import React, { createContext, useState, useEffect } from 'react';
import { addDoc, collection, getDocs } from "firebase/firestore";
import { database } from '../Firebase/firebaseSetup';

export const IngredientContext = createContext();

export const IngredientProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);

  // Fetch ingredients from Firestore
  const getIngredients = async () => {
    const querySnapshot = await getDocs(collection(database, "MyIngredients"));
    const ingredientList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setIngredients(ingredientList);
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

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <IngredientContext.Provider value={{ ingredients, addIngredient }}>
      {children}
    </IngredientContext.Provider>
  );
};
