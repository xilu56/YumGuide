import React, { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ItemsList from '../Components/ItemsList';
import { ReminderContext } from '../Context/ReminderContext';
import getColors from '../Helper/colors';

const colors = getColors();

export default function ReminderScreen({ navigation }) {
  const { reminders, deleteReminder } = useContext(ReminderContext); // Include deleteReminder

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 15 }}>
          <Pressable
            onPress={() => navigation.navigate('AddMyReminder', { isEditing: false })}
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
    navigation.navigate('AddMyReminder', { isEditing: true, reminder });
  };

  const handleDeletePress = (id) => {
    deleteReminder(id); // Call deleteReminder from the context
  };

  return (
    <View style={styles.screen}>
      <ItemsList
        items={reminders}
        onItemPress={handleItemPress}
        onDeletePress={handleDeletePress} // Pass delete function to ItemsList
      />
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
