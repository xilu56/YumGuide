import React, { createContext, useState, useEffect } from 'react';
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { database } from '../Firebase/firebaseSetup';

export const DishContext = createContext();

export const DishProvider = ({ children }) => {
  const [dishes, setDishes] = useState([]);

  // Fetch dishes from Firestore
  const getDishes = async () => {
    try {
      const querySnapshot = await getDocs(collection(database, "MyDishes"));
      const dishList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDishes(dishList);
    } catch (err) {
      console.error("Error fetching dishes:", err);
    }
  };

  // Add dish to Firestore and update local state
  const addDish = async (dish) => {
    try {
      const docRef = await addDoc(collection(database, "MyDishes"), dish);
      setDishes([...dishes, { id: docRef.id, ...dish }]);
    } catch (err) {
      console.error("Error adding dish:", err);
    }
  };

  // Update dish in Firestore and update local state
  const updateDish = async (id, updatedDish) => {
    try {
      const dishRef = doc(database, "MyDishes", id);
      await updateDoc(dishRef, updatedDish);
      setDishes(dishes.map(dish =>
        dish.id === id ? { ...dish, ...updatedDish } : dish
      ));
    } catch (err) {
      console.error("Error updating dish:", err);
    }
  };

  // Delete dish from Firestore and update local state
  const deleteDish = async (id) => {
    try {
      const dishRef = doc(database, "MyDishes", id);
      await deleteDoc(dishRef);
      setDishes(dishes.filter(dish => dish.id !== id));
    } catch (err) {
      console.error("Error deleting dish:", err);
    }
  };

  useEffect(() => {
    getDishes();
  }, []);

  return (
    <DishContext.Provider value={{ dishes, addDish, updateDish, deleteDish }}>
      {children}
    </DishContext.Provider>
  );
}
