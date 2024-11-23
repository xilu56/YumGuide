import React, { createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { getDocs, collection } from "firebase/firestore";
import { database, auth } from "../Firebase/firebaseSetup";

export const NotificationContext = createContext();

// Move syncNotificationsWithFirestore to global scope
export const syncNotificationsWithFirestore = async () => {
  if (!auth.currentUser) return; // Ensure user is authenticated
  const userId = auth.currentUser.uid;

  try {
    // Fetch reminders from Firestore
    const querySnapshot = await getDocs(collection(database, `users/${userId}/reminders`));
    const remindersFromFirestore = querySnapshot.docs.map((doc) => ({
      title: doc.data().title,
      body: doc.data().description,
      time: new Date(`${doc.data().date}T${doc.data().time}`).toISOString(), // Convert to UTC
    }));

    // Sync Firestore data with AsyncStorage
    await AsyncStorage.setItem("notifications", JSON.stringify(remindersFromFirestore));
    console.log("Synchronized notifications with Firestore:", remindersFromFirestore);
  } catch (err) {
    console.error("Error syncing notifications with Firestore:", err);
  }
};

export const scheduleNotification = async (title, body, time) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: { date: new Date(time) }, // Trigger notification at specific time
    });
    console.log(`Notification scheduled for: ${time}`);
  } catch (err) {
    console.error("Error scheduling notification:", err);
  }
};

export const NotificationProvider = ({ children }) => {
  const checkNotifications = async () => {
    try {
      const now = new Date();

      // Fetch notifications from AsyncStorage
      const storedNotifications = await AsyncStorage.getItem("notifications");
      const notifications = JSON.parse(storedNotifications) || [];

      // Find due notifications
      const dueNotifications = notifications.filter(
        (notification) => new Date(notification.time) <= now
      );

      // Send due notifications
      for (const notification of dueNotifications) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: notification.title,
            body: notification.body,
          },
          trigger: null, // Immediate trigger
        });
      }

      // Keep only undelivered notifications
      const remainingNotifications = notifications.filter(
        (notification) => new Date(notification.time) > now
      );
      console.log("Remaining Notifications:", remainingNotifications);

      // Update AsyncStorage
      await AsyncStorage.setItem("notifications", JSON.stringify(remainingNotifications));
    } catch (err) {
      console.error("Error checking notifications:", err);
    }
  };

  useEffect(() => {
    // Sync notifications with Firestore on app load
    syncNotificationsWithFirestore();

    // Regularly check notifications
    const interval = setInterval(checkNotifications, 30000); // Every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider value={{ syncNotificationsWithFirestore }}>
      {children}
    </NotificationContext.Provider>
  );
};
