import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

const Row: React.FC<ViewProps> = ({ style, ...props }) => {
  return <View style={[styles.container, style]} {...props} />;
};

export default Row;
