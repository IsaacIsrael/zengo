import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, TouchableOpacityProps, Text, TextStyle } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Sizes } from '../../constants/Sizes';

import Touchable from './Touchable';
import Body from '../text/Body';

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.PRIMARY,
    width: '100%',
    padding: Sizes.GUTTER,
    alignItems: 'center',
    borderRadius: 4,
  },
  outlineStyle: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 4,
  },
  buttonDisabled: {
    shadowOpacity: 0,
  },
  text: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  outlineText: {
    color: Colors.PRIMARY,
  },
  textDisabled: {},
});

type ButtonType = 'filled' | 'outlined';

type ButtonProps = {
  title: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  children?: undefined;
  disabled?: boolean;
  type?: ButtonType;
};

type Props = ButtonProps & Omit<TouchableOpacityProps, keyof ButtonProps>;

const Button: React.FC<Props> = ({ title, style, type, disabled, titleStyle, ...props }) => {
  return (
    <Touchable
      {...props}
      style={[styles.button, type === 'outlined' && styles.outlineStyle, disabled && styles.buttonDisabled, style]}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Body
        style={[styles.text, type === 'outlined' && styles.outlineText, disabled && styles.textDisabled, titleStyle]}
      >
        {title}
      </Body>
    </Touchable>
  );
};

Button.defaultProps = {
  style: {},
  titleStyle: {},
  children: undefined,
  disabled: false,
  type: 'filled',
};

export default Button;
