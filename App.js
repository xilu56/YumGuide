import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screen Imports
import RecipesScreen from './screens/RecipesScreen';
import IngredientsScreen from './screens/IngredientsScreen';
import DishGalleryScreen from './screens/DishGalleryScreen';
import StoreLocationScreen from './screens/StoreLocationScreen';
import ReminderScreen from './screens/ReminderScreen';
import AddEditMyIngredient from './screens/AddEditMyIngredient';
import AddMyDish from './screens/AddMyDish';
import AddEditMyReminder from './screens/AddEditMyReminder';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/ProfileScreen';

// Context Providers
import { IngredientProvider } from './Context/IngredientContext';
import { ReminderProvider } from './Context/ReminderContext';
import { DishProvider } from './Context/DishContext';
import { AuthProvider, AuthContext } from './Context/AuthContext';
import { LocationProvider } from './Context/LocationContext';
import { NotificationProvider } from './Context/NotificationContext';

// Notification Setup
import * as Notifications from "expo-notifications";
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true };
  },
});

// Helper Functions
import getColors from './Helper/colors';
const colors = getColors();

// Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator (Main Tabs)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
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
            case 'Store Locate':
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
      <Tab.Screen name="Store Locate" component={StoreLocationScreen} />
      <Tab.Screen name="Reminder" component={ReminderScreen} />
    </Tab.Navigator>
  );
}

// Stack Navigator (Authentication and Main Flow)
function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {!user ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddEditMyIngredient"
            component={AddEditMyIngredient}
            options={{ title: 'Edit Ingredient' }}
          />
          <Stack.Screen
            name="AddMyDish"
            component={AddMyDish}
            options={{ title: 'Add Dish' }}
          />
          <Stack.Screen
            name="AddEditMyReminder"
            component={AddEditMyReminder}
            options={{ title: 'Edit Reminder' }}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ title: 'Profile' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <AuthProvider>
      <IngredientProvider>
        <ReminderProvider>
          <DishProvider>
            <LocationProvider>
              <NotificationProvider>
                <NavigationContainer>
                  <AppNavigator />
                </NavigationContainer>
              </NotificationProvider>
            </LocationProvider>
          </DishProvider>
        </ReminderProvider>
      </IngredientProvider>
    </AuthProvider>
  );
}
