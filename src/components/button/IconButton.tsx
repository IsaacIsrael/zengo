import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, TouchableOpacityProps, TextStyle } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '../../constants/Colors';
import { Sizes } from '../../constants/Sizes';

import Touchable from './Touchable';

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: Sizes.GUTTER * 0.5,
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
  icon: {
    color: Colors.WHITE,
  },
  outlineIcon: {
    color: Colors.PRIMARY,
  },
  iconDisabled: {},
});

type ButtonType = 'filled' | 'outlined';

export type FontAwesomeName = React.ComponentProps<typeof FontAwesome>['name'];

type IconButtonProps = {
  name: FontAwesomeName;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
  iconSize?: number;
  children?: undefined;
  disabled?: boolean;
  type?: ButtonType;
};

type Props = IconButtonProps & Omit<TouchableOpacityProps, keyof IconButtonProps>;

const IconButton: React.FC<Props> = ({ name, style, type, disabled, iconStyle, iconSize, ...props }) => {
  return (
    <Touchable
      {...props}
      style={[styles.button, type === 'outlined' && styles.outlineStyle, disabled && styles.buttonDisabled, style]}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <FontAwesome
        size={iconSize}
        style={[styles.icon, type === 'outlined' && styles.outlineIcon, disabled && styles.iconDisabled, iconStyle]}
        name={name}
      />
    </Touchable>
  );
};

IconButton.defaultProps = {
  style: {},
  iconStyle: {},
  children: undefined,
  disabled: false,
  type: 'filled',
  iconSize: 20,
};

export default IconButton;
