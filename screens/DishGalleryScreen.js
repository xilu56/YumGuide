import React, { useContext, useLayoutEffect, useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ItemsList from '../Components/ItemsList';
import getColors from '../Helper/colors';
import { DishContext } from '../Context/DishContext';

const colors = getColors();

export default function DishGalleryScreen({ navigation }) {
  const { dishes, deleteDish, updateDish } = useContext(DishContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 15 }}>
          <Pressable
            onPress={() => navigation.navigate('AddMyDish')}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          >
            <Ionicons name="add" size={24} color={colors.white} style={{ marginRight: 5 }} />
          </Pressable>
          <Ionicons name="image" size={24} color={colors.white} />
        </View>
      ),
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.white,
    });
  }, [navigation]);

  const handleItemPress = (dish) => {
    navigation.navigate('AddMyDish', { isEditing: true, dish });
  };

  const handleDeletePress = (id) => {
    deleteDish(id);
  };

  return (
    <View style={styles.screen}>
      <ItemsList
        items={dishes}
        onItemPress={handleItemPress} // Edit functionality
        onDeletePress={handleDeletePress} // Delete functionality
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
