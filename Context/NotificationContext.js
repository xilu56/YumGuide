import React, { createContext, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { getDocs, collection } from "firebase/firestore";
import { database, auth } from "../Firebase/firebaseSetup";

export const NotificationContext = createContext();

export const syncNotificationsWithFirestore = async () => {
  if (!auth.currentUser) return;
  const userId = auth.currentUser.uid;

  try {
    const querySnapshot = await getDocs(collection(database, `users/${userId}/reminders`));
    const remindersFromFirestore = querySnapshot.docs.map((doc) => ({
      title: doc.data().title,
      body: doc.data().description,
      time: new Date(`${doc.data().date}T${doc.data().time}`),
    }));

    await AsyncStorage.setItem("notifications", JSON.stringify(remindersFromFirestore));
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
      trigger: {
        date: new Date(time),
        type: "date",
      },
    });
    console.log(`[Schedule] Notification scheduled for: ${time}`);
  } catch (err) {
    console.error("[Schedule] Error scheduling notification:", err);
  }
};

export const NotificationProvider = ({ children }) => {
  useEffect(() => {
    syncNotificationsWithFirestore();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        scheduleNotification,
        syncNotificationsWithFirestore,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
