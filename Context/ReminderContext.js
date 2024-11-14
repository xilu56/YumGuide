import React, { createContext, useState, useEffect } from 'react';
import { addDoc, collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { database } from '../Firebase/firebaseSetup';

export const ReminderContext = createContext();

export const ReminderProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]);

  // Fetch reminders from Firestore
  const fetchReminders = async () => {
    const querySnapshot = await getDocs(collection(database, "Reminders"));
    const reminderList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setReminders(reminderList);
  };

  // Add a reminder to Firestore
  const addReminder = async (reminder) => {
    try {
      const docRef = await addDoc(collection(database, "Reminders"), reminder);
      setReminders([...reminders, { id: docRef.id, ...reminder }]);
    } catch (err) {
      console.error("Error adding reminder:", err);
    }
  };

  // Update a reminder in Firestore
  const updateReminder = async (id, updatedData) => {
    try {
      const reminderDoc = doc(database, "Reminders", id);
      await updateDoc(reminderDoc, updatedData);
      setReminders(reminders.map(reminder => (reminder.id === id ? { id, ...updatedData } : reminder)));
    } catch (err) {
      console.error("Error updating reminder:", err);
    }
  };

  // Delete a reminder from Firestore
  const deleteReminder = async (id) => {
    try {
      await deleteDoc(doc(database, "Reminders", id));
      setReminders(reminders.filter(reminder => reminder.id !== id));
    } catch (err) {
      console.error("Error deleting reminder:", err);
    }
  };

  useEffect(() => {
    fetchReminders(); // Fetch reminders on initial render
  }, []);

  return (
    <ReminderContext.Provider value={{ reminders, addReminder, updateReminder, deleteReminder }}>
      {children}
    </ReminderContext.Provider>
  );
};
