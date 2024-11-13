import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import getColors from '../Helper/colors';

const colors = getColors();

const StoreLocationScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.white,
    });
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Store Location</Text>
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
});

export default StoreLocationScreen;
