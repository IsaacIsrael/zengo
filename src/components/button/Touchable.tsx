import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

const Touchable: React.FC<TouchableOpacityProps> = (props) => {
  return <TouchableOpacity {...props} />;
};

export default Touchable;
