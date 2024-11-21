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

  const updateReminder = async (id, updatedReminder) => {
    try {
      const reminderRef = doc(database, "Reminders", id);
      await updateDoc(reminderRef, updatedReminder);
      setReminders(reminders.map(reminder =>
        reminder.id === id ? { ...reminder, ...updatedReminder } : reminder
      ));
    } catch (err) {
      console.error("Error updating reminder:", err);
    }
  };

  const deleteReminder = async (id) => {
    try {
      const reminderRef = doc(database, "Reminders", id);
      await deleteDoc(reminderRef);
      setReminders(reminders.filter(reminder => reminder.id !== id));
    } catch (err) {
      console.error("Error deleting reminder:", err);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, [user]);

  return (
    <ReminderContext.Provider value={{ reminders, addReminder, updateReminder, deleteReminder }}>
      {children}
    </ReminderContext.Provider>
  );
};
