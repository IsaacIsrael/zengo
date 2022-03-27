import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sizes } from '../constants/Sizes';
import Header from './Header';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: Sizes.GUTTER,
    alignItems: 'stretch',
  },
  scrollContainer: {
    flex: 0,
    position: 'relative',
  },
});

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  scroll?: boolean;
  title?: string | React.ReactNode;
};

const Container: React.FC<Props> = ({ children, style, title, scroll }) => {
  const Content = scroll ? ScrollView : View;
  const contentStyle = scroll
    ? { contentContainerStyle: [styles.container, styles.scrollContainer, style] }
    : { style: [styles.container, style] };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header title={title} />
      <Content {...contentStyle}>{children}</Content>
    </SafeAreaView>
  );
};

Container.defaultProps = {
  style: {},
  scroll: false,
  title: '',
};

export default Container;
