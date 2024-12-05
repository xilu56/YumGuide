import React, { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DishContext } from '../Context/DishContext';
import ItemsList from '../Components/ItemsList';
import getColors from '../Helper/colors';

const colors = getColors();

export default function DishGalleryScreen({ navigation }) {
  const { dishes, deleteDish } = useContext(DishContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <Pressable
            onPress={() => navigation.navigate('AddMyDish', { isEditing: false })}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          >
            <Ionicons name="add" size={24} color={colors.white} style={styles.icon} />
          </Pressable>
          <Ionicons name="images" size={24} color={colors.white} />
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
        itemType="dishGallery"
        onItemPress={handleItemPress}
        onDeletePress={handleDeletePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16, // Adjusted padding for better spacing
    backgroundColor: colors.background,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    marginRight: 10, // Spacing between icons
  },
});