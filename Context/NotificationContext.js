import React, { createContext, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { getDocs, collection } from "firebase/firestore";
import { database, auth } from "../Firebase/firebaseSetup";

export const NotificationContext = createContext();

export const syncNotificationsWithFirestore = async () => {
  if (!auth.currentUser) return; // Ensure the user is authenticated
  const userId = auth.currentUser.uid;

  try {
    // Fetch reminders from Firestore
    const querySnapshot = await getDocs(collection(database, `users/${userId}/reminders`));
    const remindersFromFirestore = querySnapshot.docs.map((doc) => ({
      title: doc.data().title,
      body: doc.data().description,
      time: new Date(`${doc.data().date}T${doc.data().time}`), // Parse to local time
    }));

    // Save synced reminders to AsyncStorage
    await AsyncStorage.setItem("notifications", JSON.stringify(remindersFromFirestore));
    console.log("[Sync] Synchronized notifications with Firestore:", remindersFromFirestore);
  } catch (err) {
    console.error("[Sync] Error syncing notifications with Firestore:", err);
  }
};

export const scheduleNotification = async (title, body, time) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: { date: new Date(time) }, // Trigger notification at a specific time
    });
    console.log(`[Schedule] Notification scheduled for: ${time}`);
  } catch (err) {
    console.error("[Schedule] Error scheduling notification:", err);
  }
};

export const NotificationProvider = ({ children }) => {
  const intervalRef = useRef(null);

  const checkNotifications = async () => {
    try {
      const now = new Date();

      // Fetch notifications from AsyncStorage
      const storedNotifications = await AsyncStorage.getItem("notifications");
      const notifications = JSON.parse(storedNotifications) || [];

      // Process due notifications
      for (const notification of notifications) {
        const notificationTime = new Date(notification.time);
        if (notificationTime <= now) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: notification.title,
              body: notification.body,
            },
            trigger: null, // Immediate trigger
          });
          console.log(`[Check] Notification sent for: ${notificationTime}`);
        }
      }

      // Keep only undelivered notifications
      const remainingNotifications = notifications.filter(
        (notification) => new Date(notification.time) > now
      );
      await AsyncStorage.setItem("notifications", JSON.stringify(remainingNotifications));
      console.log("[Check] Remaining notifications:", remainingNotifications);
    } catch (err) {
      console.error("[Check] Error checking notifications:", err);
    }
  };

  useEffect(() => {
    if (!intervalRef.current) {
      // Avoid duplicate sync or interval setup
      syncNotificationsWithFirestore();

      // Set up notification check interval
      intervalRef.current = setInterval(checkNotifications, 30000); // Check every 30 seconds
    }

    return () => {
      // Cleanup interval on unmount
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ syncNotificationsWithFirestore, scheduleNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
