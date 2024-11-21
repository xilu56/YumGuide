import React, { createContext, useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notificationPermissionGranted, setNotificationPermissionGranted] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState(null);

  const verifyNotificationPermission = async () => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        setNotificationPermissionGranted(newStatus === 'granted');
      } else {
        setNotificationPermissionGranted(true);
      }
    } catch (error) {
      console.error('Error checking notification permission:', error);
    }
  };

  const getPushToken = async () => {
    try {
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token);
    } catch (error) {
      console.error('Error fetching push token:', error);
    }
  };

  useEffect(() => {
    verifyNotificationPermission();
    getPushToken();
  }, []);

  const scheduleNotification = async (title, body, data = {}) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
        },
        trigger: { seconds: 5 }, // Schedule after 5 seconds for demonstration
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  return (
    <NotificationContext.Provider value={{ notificationPermissionGranted, expoPushToken, scheduleNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
