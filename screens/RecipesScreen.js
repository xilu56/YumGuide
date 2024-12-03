import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import getColors from '../Helper/colors';
import { AuthContext } from '../Context/AuthContext';
import { IngredientContext } from '../Context/IngredientContext';

const colors = getColors();

const RecipesScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { ingredients } = useContext(IngredientContext);

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

  useEffect(() => {
    fetchRandomRecipe();
  }, []);

  useEffect(() => {
    if (recommendedRecipe) {
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
                {missingIngredients.includes(item.name.toLowerCase().trim()) && (
                  <Ionicons name="alert-circle" size={20} color={colors.cancel} style={styles.alertIcon} />
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
    padding: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: colors.secondary,
    marginBottom: 10,
    textAlign: 'center',
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  recipeTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  ingredientText: {
    fontSize: 16,
    color: colors.black,
    flex: 1,
  },
  alertIcon: {
    marginLeft: 8,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
});

export default RecipesScreen;
