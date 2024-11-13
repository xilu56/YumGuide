import React, { useState, useLayoutEffect } from 'react';
import { View, StyleSheet, Pressable, FlatList, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function IngredientsScreen({ navigation }) {
  const [ingredients, setIngredients] = useState([]);

  // 设置头部布局和动作
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 15 }}>
          <Pressable onPress={() => navigation.navigate('AddMyIngredient')} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
            <Ionicons name="add" size={24} color="#ffffff" style={{ marginRight: 5 }} />
          </Pressable>
          <Ionicons name="leaf" size={24} color="#ffffff" />
        </View>
      ),
      headerStyle: { backgroundColor: '#6200ee' },
      headerTintColor: '#ffffff',
    });
  }, [navigation]);

  // 处理单项点击事件以导航到编辑页面
  const handleItemPress = (ingredient) => {
    navigation.navigate('AddMyIngredient', { ingredient });
  };

  // 渲染每个食材项目
  const renderItem = ({ item }) => (
    <Pressable onPress={() => handleItemPress(item)} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
      <View style={styles.item}>
        <Text style={{ color: '#333' }}>{item.name} - {item.quantity} {item.unit}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={ingredients}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
});
