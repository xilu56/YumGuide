import React, { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet, Pressable, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ItemsList from '../Components/ItemsList';
import { ReminderContext } from '../Context/ReminderContext';
import { NotificationContext } from '../Context/NotificationContext';
import getColors from '../Helper/colors';

const colors = getColors();

export default function ReminderScreen({ navigation }) {
  const { reminders, deleteReminder } = useContext(ReminderContext);
  const { scheduleNotification } = useContext(NotificationContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 15 }}>
          <Pressable
            onPress={() => navigation.navigate('AddEditMyReminder', { isEditing: false })}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          >
            <Ionicons name="add" size={24} color={colors.white} style={{ marginRight: 5 }} />
          </Pressable>
          <Ionicons name="alarm" size={24} color={colors.white} />
        </View>
      ),
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.white,
    });
  }, [navigation]);

  const handleItemPress = (reminder) => {
    navigation.navigate('AddEditMyReminder', { isEditing: true, reminder });
  };

  const handleDeletePress = (id) => {
    deleteReminder(id);
  };

  const handleScheduleNotification = () => {
    scheduleNotification('Reminder', 'This is your scheduled notification!');
  };

  return (
    <View style={styles.screen}>
      <ItemsList
        items={reminders}
        onItemPress={handleItemPress}
        onDeletePress={handleDeletePress}
      />
      <Button title="Schedule Notification" onPress={handleScheduleNotification} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background,
  },
});
