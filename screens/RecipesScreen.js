import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Image, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import getColors from '../Helper/colors';
import { AuthContext } from '../Context/AuthContext';

const colors = getColors();

const RecipesScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
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

  // Handle search (if needed for additional functionality)
  const handleSearch = () => {
    Alert.alert('Search feature is not implemented yet!');
  };

  // Example logic to mark missing ingredients (Replace with actual data)
  const userIngredients = ['Corn', 'Cream']; // Replace with data from IngredientsScreen
  useEffect(() => {
    if (recommendedRecipe) {
      const missing = recommendedRecipe.extendedIngredients.filter(
        (ingredient) => !userIngredients.includes(ingredient.name)
      ).map((ingredient) => ingredient.name);
      setMissingIngredients(missing);
    }
  }, [recommendedRecipe]);

  return (
    <View style={styles.screen}>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Pressable onPress={handleSearch}>
          <Ionicons name="search" size={24} color={colors.text} />
        </Pressable>
      </View>

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
            keyExtractor={(item) => item.id.toString()}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    padding: 5,
    fontSize: 16,
    color: colors.text,
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
