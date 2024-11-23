import React, { createContext, useState, useEffect, useContext } from 'react';
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";
import { database } from '../Firebase/firebaseSetup';
import { AuthContext } from './AuthContext';

export const DishContext = createContext();

export const DishProvider = ({ children }) => {
  const [dishes, setDishes] = useState([]);
  const { user } = useContext(AuthContext);

  const getDishes = async () => {
    if (!user) return;
    try {
      const q = query(collection(database, "MyDishes"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
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
    if (!user) return;
    try {
      const docRef = await addDoc(collection(database, "MyDishes"), {
        ...dish,
        userId: user.uid,
      });
      setDishes([...dishes, { id: docRef.id, ...dish, userId: user.uid }]);
    } catch (err) {
      console.error("Error adding dish:", err);
    }
  };
  
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
  }, [user]);

  return (
    <DishContext.Provider value={{ dishes, addDish, updateDish, deleteDish }}>
      {children}
    </DishContext.Provider>
  );
};

