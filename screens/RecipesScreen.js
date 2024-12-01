import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import getColors from '../Helper/colors';
import { AuthContext } from '../Context/AuthContext';
import { IngredientContext } from '../Context/IngredientContext'; // Import IngredientContext

const colors = getColors();

const RecipesScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { ingredients } = useContext(IngredientContext); // Get ingredients from context

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.white,
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <Pressable
            onPress={() => navigation.navigate('ProfileScreen')}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          >
            <Ionicons name="person-circle-outline" size={28} color={colors.white} />
          </Pressable>
        </View>
      ),
    });
  }, [navigation]);

  const [recommendedRecipe, setRecommendedRecipe] = useState(null);
  const [missingIngredients, setMissingIngredients] = useState([]);

  // Function to fetch a random recipe
  const fetchRandomRecipe = async () => {
    try {
      const response = await axios.get(
        'https://api.spoonacular.com/recipes/random',
        { params: { apiKey: 'f1d289212d394251a96b48c859777ba1' } }
      );
      setRecommendedRecipe(response.data.recipes[0]);
    } catch (error) {
      console.error('Error fetching random recipe:', error);
    }
  };

  // Fetch random recipe on screen load
  useEffect(() => {
    fetchRandomRecipe();
  }, []);

  // Update missingIngredients based on user ingredients
  useEffect(() => {
    if (recommendedRecipe) {
      // Ensure consistent formatting for comparison
      const userIngredientsList = ingredients.map((ingredient) =>
        ingredient.name.toLowerCase().trim()
      );
  
      const missing = recommendedRecipe.extendedIngredients.filter(
        (ingredient) => !userIngredientsList.includes(ingredient.name.toLowerCase().trim())
      ).map((ingredient) => ingredient.name);
  
      setMissingIngredients(missing);
    }
  }, [recommendedRecipe, ingredients]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Welcome to YumGuide</Text>

      {recommendedRecipe && (
        <>
          <Text style={styles.subtitle}>Recommended for you:</Text>
          <Image
            source={{ uri: recommendedRecipe.image }}
            style={styles.recipeImage}
          />
          <Text style={styles.recipeTitle}>{recommendedRecipe.title}</Text>

          <FlatList
            data={recommendedRecipe.extendedIngredients}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            renderItem={({ item }) => (
              <View style={styles.ingredientContainer}>
                <Text style={styles.ingredientText}>{item.original}</Text>
                {missingIngredients.includes(item.name) && (
                  <Ionicons name="alert-circle" size={20} color="red" />
                )}
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 5,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  ingredientText: {
    fontSize: 16,
    color: colors.text,
    marginRight: 10,
  },
});

export default RecipesScreen;
