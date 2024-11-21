import React, { useContext, useLayoutEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import getColors from '../Helper/colors';
import { AuthContext } from '../Context/AuthContext';

const colors = getColors();

const RecipesScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

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

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Recipes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background,
  },
  text: {
    color: colors.text,
    fontSize: 18,
    marginVertical: 10,
  },
  headerRightContainer: {
    marginRight: 10,
  },
});

export default RecipesScreen;
