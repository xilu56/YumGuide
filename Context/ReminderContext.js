import React, { createContext, useState, useEffect, useContext } from 'react';
import { addDoc, collection, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { database } from '../Firebase/firebaseSetup';
import { AuthContext } from './AuthContext';

export const ReminderContext = createContext();

export const ReminderProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchReminders = async () => {
    if (!user) return;
    try {
      const q = query(collection(database, "Reminders"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const reminderList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReminders(reminderList);
    } catch (err) {
      console.error("Error fetching reminders:", err);
    }
  };

  const addReminder = async (reminder) => {
    if (!user) return;
    try {
      const docRef = await addDoc(collection(database, "Reminders"), {
        ...reminder,
        userId: user.uid,
      });
      setReminders([...reminders, { id: docRef.id, ...reminder, userId: user.uid }]);
    } catch (err) {
      console.error("Error adding reminder:", err);
    }
  };

  // Remaining functions unchanged...

  useEffect(() => {
    fetchReminders();
  }, [user]);

  return (
    <ReminderContext.Provider value={{ reminders, addReminder }}>
      {children}
    </ReminderContext.Provider>
  );
};