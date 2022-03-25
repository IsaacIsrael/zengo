/* eslint-disable react/style-prop-object */
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Screen } from '../types/Navigation';
import Container from '../components/Container';
import { Sizes } from '../constants/Sizes';
import Title from '../components/text/Title';
import Body from '../components/text/Body';
import Small from '../components/text/Small';
import Button from '../components/button/Button';
import Row from '../components/Row';
import { RootState } from '../store';

import { Creators as countReducer, Types as countActions } from '../store/duckers/count';
import useIsRequestLoading from '../hooks/useIsRequestLoading';
import { Colors } from '../constants/Colors';

const styles = StyleSheet.create({
  title: {
    marginTop: Sizes.GUTTER * 2,
    textAlign: 'center',
  },
  text: {
    marginTop: Sizes.GUTTER,
    marginBottom: Sizes.GUTTER * 0.25,
  },
  loading: {
    marginTop: Sizes.GUTTER,
  },
  countWrapper: {
    marginTop: Sizes.GUTTER,
    alignItems: 'center',
  },
  button: {
    width: 'auto',
    flex: 1,
  },
  count: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const Home: Screen<'Home'> = () => {
  const countValue = useSelector<RootState, number>(({ count }) => count.value);
  const isAdding = useIsRequestLoading(countActions.ADD_COUNT);
  const isRemoving = useIsRequestLoading(countActions.REMOVE_COUNT);
  const dispatch = useDispatch();

  const onAddPress = (): void => {
    dispatch(countReducer.addCount(1));
  };

  const onRemovePress = (): void => {
    dispatch(countReducer.removeCount(1));
  };

  return (
    <Container>
      <Title style={styles.title}>Home Screen</Title>
      <Body style={styles.text}>Open up view/Home.tsx to start working on this screen!</Body>
      <Small>Lets create a great app.</Small>
      {(isAdding || isRemoving) && <ActivityIndicator style={styles.loading} color={Colors.PRIMARY} />}
      <Row style={styles.countWrapper}>
        <Button title="+" style={styles.button} onPress={onAddPress} disabled={isAdding || isRemoving} />
        <Body style={styles.count}>{countValue}</Body>
        <Button title="-" style={styles.button} onPress={onRemovePress} disabled={isAdding || isRemoving} />
      </Row>
    </Container>
  );
};

export default Home;
