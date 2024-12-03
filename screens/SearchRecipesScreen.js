import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView } from 'react-native';
import { IngredientContext } from '../Context/IngredientContext';
import axios from 'axios';
import getColors from '../Helper/colors';
import { Ionicons } from '@expo/vector-icons';

const colors = getColors();

export default function SearchRecipesScreen() {
  const { ingredients } = useContext(IngredientContext);
  const [recipes, setRecipes] = useState([]);
  const [missingIngredients, setMissingIngredients] = useState({});

  const fetchRecipes = async () => {
    try {
      const apiKey = 'f1d289212d394251a96b48c859777ba1';
      const ingredientNames = ingredients.map((ingredient) => ingredient.name).join(',');
      const apiUrl = ingredientNames
        ? `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientNames}&apiKey=${apiKey}`
        : `https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`;

      const response = await axios.get(apiUrl);
      setRecipes(response.data);
    } catch (error) {
      if (error.response) {
        console.error('Error fetching recipes:', {
          status: error.response.status,
          data: error.response.data,
        });
      } else {
        console.error('Error fetching recipes:', error.message);
      }
    }
  };

  const updateMissingIngredients = () => {
    const userIngredients = ingredients.map((ingredient) => ingredient.name.toLowerCase());
    const missing = {};

    recipes.forEach((recipe) => {
      const recipeMissingIngredients = recipe.missedIngredients
        ? recipe.missedIngredients.filter(
            (item) => !userIngredients.includes(item.name.toLowerCase())
          ).map((item) => item.name)
        : [];
      missing[recipe.id] = recipeMissingIngredients;
    });

    setMissingIngredients(missing);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (recipes.length > 0) {
      updateMissingIngredients();
    }
  }, [recipes, ingredients]);

  return (
    <FlatList
      data={recipes}
      keyExtractor={(recipe, index) => recipe.id?.toString() || index.toString()}
      contentContainerStyle={styles.screen}
      renderItem={({ item: recipe }) => (
        <View style={styles.recipeCard}>
          <Image source={{ uri: recipe.image }} style={styles.image} />
          <Text style={styles.title}>{recipe.title}</Text>
          <FlatList
            data={recipe.missedIngredients || []}
            keyExtractor={(item, idx) => item.id?.toString() || `${item.name}-${idx}`}
            renderItem={({ item }) => (
              <View style={styles.ingredientRow}>
                <Text style={styles.ingredientText}>{item.name}</Text>
                {missingIngredients[recipe.id]?.includes(item.name) && (
                  <Ionicons name="alert-circle" size={20} color="red" />
                )}
              </View>
            )}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.background,
  },
  recipeCard: {
    marginBottom: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ingredientText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
});
