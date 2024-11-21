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

  // Remaining functions unchanged...

  useEffect(() => {
    getDishes();
  }, [user]);

  return (
    <DishContext.Provider value={{ dishes, addDish }}>
      {children}
    </DishContext.Provider>
  );
};

