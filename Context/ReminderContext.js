import React, { createContext, useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { database } from "../Firebase/firebaseSetup";
import { auth } from "../Firebase/firebaseSetup";
import { syncNotificationsWithFirestore } from "./NotificationContext";

export const ReminderContext = createContext();

export const ReminderProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]);

  const fetchReminders = async () => {
    if (!auth.currentUser) return; // Ensure user is authenticated
    const userId = auth.currentUser.uid;
    try {
      const querySnapshot = await getDocs(collection(database, `users/${userId}/reminders`));
      const reminderList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: new Date(`${doc.data().date}T${doc.data().time}`).toLocaleDateString("en-CA"),
      }));
      setReminders(reminderList);
    } catch (err) {
      console.error("Error fetching reminders:", err);
    }
  };  

  const addReminder = async (reminder) => {
    if (!auth.currentUser) return; // Ensure user is authenticated
    const userId = auth.currentUser.uid;
    try {
      const docRef = await addDoc(collection(database, `users/${userId}/reminders`), reminder);
      setReminders([...reminders, { id: docRef.id, ...reminder }]);
      await syncNotificationsWithFirestore();
    } catch (err) {
      console.error("Error adding reminder:", err);
    }
  };

  const updateReminder = async (id, updatedReminder) => {
    if (!auth.currentUser) return; // Ensure user is authenticated
    const userId = auth.currentUser.uid;
    try {
      const reminderRef = doc(database, `users/${userId}/reminders/${id}`);
      await updateDoc(reminderRef, updatedReminder);
      setReminders(reminders.map(reminder =>
        reminder.id === id ? { ...reminder, ...updatedReminder } : reminder
      ));
    } catch (err) {
      console.error("Error updating reminder:", err);
    }
  };

  const deleteReminder = async (id) => {
    if (!auth.currentUser) return; // Ensure user is authenticated
    const userId = auth.currentUser.uid;
    try {
      const reminderRef = doc(database, `users/${userId}/reminders/${id}`);
      await deleteDoc(reminderRef);
      setReminders(reminders.filter(reminder => reminder.id !== id));
    } catch (err) {
      console.error("Error deleting reminder:", err);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <ReminderContext.Provider value={{ reminders, addReminder, updateReminder, deleteReminder }}>
      {children}
    </ReminderContext.Provider>
  );
};
