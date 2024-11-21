import React, { createContext, useState, useEffect, useContext } from 'react';
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";
import { database } from '../Firebase/firebaseSetup';
import { AuthContext } from './AuthContext';

export const IngredientContext = createContext();

export const IngredientProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);
  const { user } = useContext(AuthContext);

  // Fetch ingredients from Firestore
  const getIngredients = async () => {
    if (!user) return; // Ensure user is logged in
    try {
      const q = query(collection(database, "MyIngredients"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
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
    if (!user) return; // Ensure user is logged in
    try {
      const docRef = await addDoc(collection(database, "MyIngredients"), {
        ...ingredient,
        userId: user.uid, // Associate ingredient with user
      });
      setIngredients([...ingredients, { id: docRef.id, ...ingredient, userId: user.uid }]);
    } catch (err) {
      console.error("Error adding ingredient:", err);
    }
  };

  // Remaining functions unchanged...

  useEffect(() => {
    getIngredients();
  }, [user]); // Reload when user changes

  return (
    <IngredientContext.Provider value={{ ingredients, addIngredient }}>
      {children}
    </IngredientContext.Provider>
  );
};
