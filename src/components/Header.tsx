import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import _ from 'lodash';
import { Sizes } from '../constants/Sizes';
import IconButton from './button/IconButton';
import Row from './Row';
import Title from './text/Title';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.GUTTER,
    paddingTop: Sizes.GUTTER,
    elevation: 1,
    zIndex: 1,
  },
  title: {
    marginTop: Sizes.GUTTER * 0.25,
    textTransform: 'capitalize',
  },
  button: {
    width: 40,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 40,
  },
});

type Props = {
  title: string | React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Header: React.FC<Props> = ({ title, style }) => {
  const navigation = useNavigation();

  const onBackClick = (): void => {
    navigation.goBack();
  };

  return (
    <Row style={[styles.container, style]}>
      {navigation.canGoBack() ? (
        <IconButton name="arrow-left" onPress={onBackClick} type="outlined" style={styles.button} />
      ) : (
        <View style={styles.icon} />
      )}
      {_.isString(title) ? <Title style={styles.title}>{title}</Title> : title}
      <View style={styles.icon} />
    </Row>
  );
};

Header.defaultProps = {
  style: {},
};

export default Header;
