import React, { createContext, useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { database } from "../Firebase/firebaseSetup";
import { auth } from "../Firebase/firebaseSetup";

export const IngredientContext = createContext();

export const IngredientProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);

  const fetchIngredients = async () => {
    if (!auth.currentUser) return; // Ensure user is authenticated
    const userId = auth.currentUser.uid;
    try {
      const querySnapshot = await getDocs(collection(database, `users/${userId}/ingredients`));
      const ingredientList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIngredients(ingredientList);
    } catch (err) {
      console.error("Error fetching ingredients:", err);
    }
  };

  const addIngredient = async (ingredient) => {
    if (!auth.currentUser) return; // Ensure user is authenticated
    const userId = auth.currentUser.uid;
    try {
      const docRef = await addDoc(collection(database, `users/${userId}/ingredients`), ingredient);
      setIngredients([...ingredients, { id: docRef.id, ...ingredient }]);
    } catch (err) {
      console.error("Error adding ingredient:", err);
    }
  };

  const updateIngredient = async (id, updatedIngredient) => {
    if (!auth.currentUser) return; // Ensure user is authenticated
    const userId = auth.currentUser.uid;
    try {
      const ingredientRef = doc(database, `users/${userId}/ingredients/${id}`);
      await updateDoc(ingredientRef, updatedIngredient);
      setIngredients(ingredients.map(ingredient =>
        ingredient.id === id ? { ...ingredient, ...updatedIngredient } : ingredient
      ));
    } catch (err) {
      console.error("Error updating ingredient:", err);
    }
  };

  const deleteIngredient = async (id) => {
    if (!auth.currentUser) return; // Ensure user is authenticated
    const userId = auth.currentUser.uid;
    try {
      const ingredientRef = doc(database, `users/${userId}/ingredients/${id}`);
      await deleteDoc(ingredientRef);
      setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
    } catch (err) {
      console.error("Error deleting ingredient:", err);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <IngredientContext.Provider
      value={{
        ingredients,
        addIngredient,
        updateIngredient,
        deleteIngredient,
      }}
    >
      {children}
    </IngredientContext.Provider>
  );
};
