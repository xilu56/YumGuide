import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import getColors from '../Helper/colors';

const colors = getColors();
const { cancel: cancelColor, button: buttonColor, accent, primary, buttonText } = colors; // Destructure the color values

export default function Button({ title, onPress, style }) {

  const backgroundColor = title === 'Cancel' ? cancelColor : buttonColor;

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: accent }}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? primary : backgroundColor },
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
