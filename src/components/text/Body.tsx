import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { Colors } from '../../constants/Colors';

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    letterSpacing: 0.25,
    color: Colors.TEXT,
  },
});

const Body: React.FC<TextProps> = ({ style, ...props }) => {
  return <Text style={[styles.text, style]} {...props} />;
};

export default Body;
