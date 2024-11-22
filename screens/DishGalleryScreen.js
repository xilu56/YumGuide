import React, { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DishContext } from '../Context/DishContext';
import ItemsList from '../Components/ItemsList';
import getColors from '../Helper/colors';

const colors = getColors();

export default function DishGalleryScreen({ navigation }) {
  const { dishes } = useContext(DishContext);

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
        </View>
      ),
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.white,
    });
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <ItemsList items={dishes} itemType="dishGallery" /> 
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
