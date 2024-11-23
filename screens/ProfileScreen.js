import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { CommonActions } from '@react-navigation/native';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    setTimeout(() => {
      navigation.navigate('Login');
    }, 0);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Logged in as:</Text>
      <Text style={styles.info}>{user?.email || 'Unknown User'}</Text>
      <Text style={styles.label}>User ID:</Text>
      <Text style={styles.info}>{user?.uid || 'No User ID'}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    marginBottom: 20,
  },
});
