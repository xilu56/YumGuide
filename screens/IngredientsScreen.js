import React, { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ItemsList from '../Components/ItemsList';
import { IngredientContext } from '../Context/IngredientContext';
import getColors from '../Helper/colors';
import Button from '../Components/Button';
import { useNavigation } from '@react-navigation/native';

const colors = getColors();

export default function IngredientsScreen({ navigation }) {
  const { ingredients, deleteIngredient } = useContext(IngredientContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 15 }}>
          <Pressable
            onPress={() => navigation.navigate('AddEditMyIngredient', { isEditing: false })}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          >
            <Ionicons name="add" size={24} color={colors.white} style={{ marginRight: 5 }} />
          </Pressable>
          <Ionicons name="nutrition" size={24} color={colors.white} />
        </View>
      ),
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.white,
    });
  }, [navigation]);

  const handleItemPress = (ingredient) => {
    navigation.navigate('AddEditMyIngredient', { isEditing: true, ingredient });
  };

  const handleDeletePress = (id) => {
    deleteIngredient(id);
  };

  const navigateToSearch = () => {
    navigation.navigate('SearchRecipes');
  };

  return (
    <View style={styles.screen}>
      <ItemsList
        items={ingredients}
        itemType="ingredients"
        onItemPress={handleItemPress}
        onDeletePress={handleDeletePress}
      />
      <Button
        title="Search"
        onPress={navigateToSearch}
        style={styles.searchButton}
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
  searchButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
});
