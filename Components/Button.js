import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import getColors from '../Helper/colors';

const colors = getColors();

export default function Button({ title, onPress, style, textStyle }) {
  const backgroundColor =
    title === 'Cancel' ? colors.primary :
    title === 'Save' || title === 'Search' ? colors.accent : colors.gray;

  const buttonTextColor =
    title === 'Cancel' ? colors.white :
    title === 'Save' || title === 'Search' ? colors.black : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: colors.ripple }}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed && title !== 'Cancel' ? colors.accent : backgroundColor },
        style,
      ]}
    >
      <Text style={[styles.text, { color: buttonTextColor }, textStyle]}>
        {title || 'Button'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
