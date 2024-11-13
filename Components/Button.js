import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import getColors from '../Helper/colors';

const colors = getColors();

export default function Button({ title, onPress, style }) {
  const backgroundColor = title === 'Cancel' ? colors.primary : colors.accent;
  const buttonText = title === 'Save' ? colors.primary : colors.accent;

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: colors.ripple }}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? colors.accent : backgroundColor },
        style,
      ]}
    >
      <Text style={[styles.text, { color: buttonText }]}>
        {title}
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