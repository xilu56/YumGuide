import React, { createContext } from "react";
import { Alert } from "react-native";
import * as Notifications from "expo-notifications";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  // Verify and request permissions
  async function verifyPermission() {
    try {
      const permissionResponse = await Notifications.getPermissionsAsync();
      if (permissionResponse.granted) {
        return true;
      }
      const requestedPermission = await Notifications.requestPermissionsAsync();
      return requestedPermission.granted;
    } catch (err) {
      console.error("Error verifying permission:", err);
    }
  }

  // Schedule notification
  async function scheduleNotificationHandler(title, body, scheduledDateTime) {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give permission for notifications");
        return;
      }

      if (!(scheduledDateTime instanceof Date) || isNaN(scheduledDateTime.getTime())) {
        console.error("Invalid scheduledDateTime provided:", scheduledDateTime);
        return;
      }

      const now = new Date();
      if (scheduledDateTime <= now) {
        Alert.alert("Error", "Notification time must be in the future.");
        return;
      }

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: title,
          body: body,
        },
        trigger: {
          date: scheduledDateTime,
        },
      });
      console.log(`Notification scheduled for ${scheduledDateTime}, ID: ${notificationId}`);
    } catch (err) {
      console.error("Error scheduling notification:", err);
    }
  }

  return (
    <NotificationContext.Provider value={{ scheduleNotification: scheduleNotificationHandler }}>
      {children}
    </NotificationContext.Provider>
  );
};
