import React, { createContext, useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { database } from "../Firebase/firebaseSetup";
import { auth } from "../Firebase/firebaseSetup";

export const DishContext = createContext();

export const DishProvider = ({ children }) => {
  const [dishes, setDishes] = useState([]);

  const fetchDishes = async () => {
    if (!auth.currentUser) return; // Ensure user is authenticated
    const userId = auth.currentUser.uid;
    try {
      const querySnapshot = await getDocs(collection(database, `users/${userId}/dishes`));
      const dishList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDishes(dishList);
    } catch (err) {
      console.error("Error fetching dishes:", err);
    }
  };

  const addDish = async (dish) => {
    if (!auth.currentUser) return; // Ensure user is authenticated
    const userId = auth.currentUser.uid;
    try {
      const docRef = await addDoc(collection(database, `users/${userId}/dishes`), dish);
      setDishes([...dishes, { id: docRef.id, ...dish }]);
    } catch (err) {
      console.error("Error adding dish:", err);
    }
  };

  const updateDish = async (id, updatedDish) => {
    if (!auth.currentUser) return; // Ensure user is authenticated
    const userId = auth.currentUser.uid;
    try {
      const dishRef = doc(database, `users/${userId}/dishes/${id}`);
      await updateDoc(dishRef, updatedDish);
      setDishes(dishes.map(dish =>
        dish.id === id ? { ...dish, ...updatedDish } : dish
      ));
    } catch (err) {
      console.error("Error updating dish:", err);
    }
  };

  const deleteDish = async (id) => {
    if (!auth.currentUser) return; // Ensure user is authenticated
    const userId = auth.currentUser.uid;
    try {
      const dishRef = doc(database, `users/${userId}/dishes/${id}`);
      await deleteDoc(dishRef);
      setDishes(dishes.filter(dish => dish.id !== id));
    } catch (err) {
      console.error("Error deleting dish:", err);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <DishContext.Provider value={{ dishes, addDish, updateDish, deleteDish }}>
      {children}
    </DishContext.Provider>
  );
};
