import React, { createContext, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { getReminders } from '../Firebase/firestoreHelper';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const syncNotificationsWithFirestore = async () => {
    try {
      // 从 Firestore 获取通知数据
      const remindersFromFirestore = await getReminders();
      const formattedNotifications = remindersFromFirestore.map((reminder) => ({
        title: reminder.title,
        body: reminder.description,
        time: new Date(`${reminder.date}T${reminder.time}`).toISOString(),
      }));

      // 将 Firestore 数据与 AsyncStorage 同步
      await AsyncStorage.setItem(
        "notifications",
        JSON.stringify(formattedNotifications)
      );

      console.log("Synchronized notifications with Firestore:", formattedNotifications);
    } catch (err) {
      console.error("Error syncing notifications with Firestore:", err);
    }
  };

  const checkNotifications = async () => {
    try {
      const now = new Date();

      // 从 AsyncStorage 获取本地通知
      const storedNotifications = await AsyncStorage.getItem("notifications");
      const notifications = JSON.parse(storedNotifications) || [];

      // 找到到期的通知
      const dueNotifications = notifications.filter(
        (notification) => new Date(notification.time) <= now
      );

      // 发送到期通知
      for (const notification of dueNotifications) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: notification.title,
            body: notification.body,
          },
          trigger: null,
        });
      }

      // 保留未到期通知
      const remainingNotifications = notifications.filter(
        (notification) => new Date(notification.time) > now
      );
      console.log("Remaining Notifications:", remainingNotifications);

      // 更新本地存储
      await AsyncStorage.setItem(
        "notifications",
        JSON.stringify(remainingNotifications)
      );
    } catch (err) {
      console.error("Error checking notifications:", err);
    }
  };

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

      // 存储通知到本地
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

  useEffect(() => {
    // 同步 Firestore 和本地存储
    syncNotificationsWithFirestore();

    // 定期检查通知
    const interval = setInterval(checkNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider value={{ scheduleNotification: scheduleNotificationHandler }}>
      {children}
    </NotificationContext.Provider>
  );
};
