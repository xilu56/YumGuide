import React, { useState, useLayoutEffect, useEffect, useContext } from 'react';
import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ItemsList from '../Components/ItemsList';
import getColors from '../Helper/colors';
import { getPhotos } from '../Firebase/firestoreHelper';
import { DishContext } from '../Context/DishContext';

const colors = getColors();

export default function DishGalleryScreen({ navigation }) {
  const [dishes, setDishes] = useState([]);
  const { deleteDish } = useContext(DishContext);

  useEffect(() => {
    async function fetchPhotos() {
      const photos = await getPhotos();
      setDishes(photos);
    }
    fetchPhotos();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 15 }}>
          <Pressable onPress={() => navigation.navigate('AddMyDish')} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
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
    navigation.navigate('AddMyDish', { dish });
  };

  const handleDeletePress = (id) => {
    deleteDish(id);
    setDishes(dishes.filter(dish => dish.id !== id));
  };

  return (
    <View style={styles.screen}>
      <ItemsList 
        items={dishes} 
        onItemPress={handleItemPress} 
        onDeletePress={handleDeletePress}
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: colors.gray,
    borderRadius: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
});
