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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for main screens
function MainTabs() {
  return (
    <Tab.Navigator>
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
