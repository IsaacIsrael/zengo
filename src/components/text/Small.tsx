import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { Colors } from '../../constants/Colors';

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    letterSpacing: 0.25,
    color: Colors.TEXT,
  },
});

const Small: React.FC<TextProps> = ({ style, ...props }) => {
  return <Text style={[styles.text, style]} {...props} />;
};

export default Small;
