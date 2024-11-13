import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your screens
import RecipesScreen from './screens/RecipesScreen';
import IngredientsScreen from './screens/IngredientsScreen';
import DishGalleryScreen from './screens/DishGalleryScreen';
import StoreLocationScreen from './screens/StoreLocationScreen';
import ReminderScreen from './screens/ReminderScreen';

import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for main screens
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Set the Ionicons icon names based on the route
          if (route.name === 'Recipes') {
            iconName = 'fast-food-outline'; // Matches the "burger" icon in the drawing
          } else if (route.name === 'Ingredients') {
            iconName = 'leaf-outline'; // Matches the "mortar and pestle" or a food-related icon
          } else if (route.name === 'Dish Gallery') {
            iconName = 'image-outline'; // Matches the "gallery" icon in the drawing
          } else if (route.name === 'Store Location') {
            iconName = 'cart-outline'; // Matches the "shopping cart" icon in the drawing
          } else if (route.name === 'Reminder') {
            iconName = 'notifications-outline'; // Matches the "bell" icon in the drawing
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Recipes" component={RecipesScreen} />
      <Tab.Screen name="Ingredients" component={IngredientsScreen} />
      <Tab.Screen name="Dish Gallery" component={DishGalleryScreen} />
      <Tab.Screen name="Store Location" component={StoreLocationScreen} />
      <Tab.Screen name="Reminder" component={ReminderScreen} />
    </Tab.Navigator>
  );
}

// Main App component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        {/* Add more detailed screens if needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
