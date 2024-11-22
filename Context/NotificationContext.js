import React, { createContext } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const scheduleNotificationHandler = async (title, body, scheduledDateTime) => {
    try {
      const hasPermission = await Notifications.getPermissionsAsync();
      if (!hasPermission.granted) {
        Alert.alert("Permission Required", "You need to grant notification permissions.");
        return;
      }

      const now = new Date();
      if (scheduledDateTime <= now) {
        Alert.alert("Invalid Time", "Notification time must be in the future.");
        return;
      }

      const storedNotifications = await AsyncStorage.getItem("notifications");
      const notifications = JSON.parse(storedNotifications) || [];
      notifications.push({
        title,
        body,
        time: scheduledDateTime.toISOString(),
      });
      await AsyncStorage.setItem("notifications", JSON.stringify(notifications));
      console.log(`Notification scheduled locally for: ${scheduledDateTime}`);
    } catch (err) {
      console.error("Error scheduling notification:", err);
    }
  };

  return (
    <NotificationContext.Provider value={{ scheduleNotification: scheduleNotificationHandler }}>
      {children}
    </NotificationContext.Provider>
  );
};
