import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import RecipesScreen from './screens/RecipesScreen';
import IngredientsScreen from './screens/IngredientsScreen';
import DishGalleryScreen from './screens/DishGalleryScreen';
import StoreLocationScreen from './screens/StoreLocationScreen';
import ReminderScreen from './screens/ReminderScreen';
import AddEditMyIngredient from './screens/AddEditMyIngredient';
import AddMyDish from './screens/AddMyDish';
import AddMyReminder from './screens/AddMyReminder';

import { IngredientProvider } from './Context/IngredientContext';
import getColors from './Helper/colors';

const colors = getColors();

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
          switch (route.name) {
            case 'Recipes':
              iconName = 'fast-food-outline';
              break;
            case 'Ingredients':
              iconName = 'nutrition-outline';
              break;
            case 'Dish Gallery':
              iconName = 'image-outline';
              break;
            case 'Store Location':
              iconName = 'cart-outline';
              break;
            case 'Reminder':
              iconName = 'notifications-outline';
              break;
            default:
              iconName = 'help-circle-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: { backgroundColor: colors.primary },
      })}
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
    <IngredientProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="AddEditMyIngredient" component={AddEditMyIngredient} />
          <Stack.Screen name="AddMyDish" component={AddMyDish} />
          <Stack.Screen name="AddMyReminder" component={AddMyReminder} />
        </Stack.Navigator>
      </NavigationContainer>
    </IngredientProvider>
  );
}
