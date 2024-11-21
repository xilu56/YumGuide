import React, { createContext, useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notificationPermissionGranted, setNotificationPermissionGranted] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState(null);

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        setNotificationPermissionGranted(finalStatus === 'granted');
        if (finalStatus === 'granted') {
          token = (await Notifications.getExpoPushTokenAsync()).data;
          setExpoPushToken(token);
        } else {
          alert('Push notifications are disabled. Please enable them in settings.');
        }
      } catch (error) {
        console.error('Error registering for push notifications:', error);
      }
    } else {
      alert('Must use physical device for Push Notifications');
    }
    return token;
  };

  const scheduleNotification = async (title = 'Default Title', body = 'Default Body', data = {}) => {
    try {
      if (!title || typeof title !== 'string') {
        throw new Error('Invalid notification title: Title must be a non-empty string.');
      }
      if (!body || typeof body !== 'string') {
        throw new Error('Invalid notification body: Body must be a non-empty string.');
      }
  
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
        },
        trigger: { seconds: 2 },
      });
  
      console.log('Notification scheduled successfully:', { title, body, data });
    } catch (error) {
      console.error('Error scheduling notification:', error.message);
    }
  };
  

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <NotificationContext.Provider value={{ scheduleNotification, expoPushToken, notificationPermissionGranted }}>
      {children}
    </NotificationContext.Provider>
  );
};
