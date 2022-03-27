/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ListRenderItem, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Screen } from '../types/Navigation';
import Container from '../components/Container';
import { Sizes } from '../constants/Sizes';
import Title from '../components/text/Title';
import Body from '../components/text/Body';
import { RootState } from '../store';

import { Creators as countReducer, Types as countActions } from '../store/duckers/crypto';
import useIsRequestLoading from '../hooks/useIsRequestLoading';
import { Crypto } from '../types/Cryto';
import Row from '../components/Row';
import currencyFormat from '../helper/currencyFormat';
import { Colors } from '../constants/Colors';
import Button from '../components/button/Button';
import IconButton from '../components/button/IconButton';
import useIsRequestSucceeded from '../hooks/useIsRequestSucceeded';

const styles = StyleSheet.create({
  title: {
    marginTop: Sizes.GUTTER * 2,
    textAlign: 'center',
  },
  coins: {
    marginTop: Sizes.GUTTER * 2,
  },
  coinContainer: {
    alignItems: 'center',
  },
  coinIcon: {
    width: 40,
    aspectRatio: 1,
  },
  coinName: {
    marginLeft: Sizes.GUTTER,
    fontWeight: 'bold',
  },
  coinPriceWrapper: {
    marginLeft: 'auto',
    alignItems: 'center',
  },
  coinPrice: {
    marginRight: Sizes.GUTTER,
  },
  separator: {
    marginVertical: Sizes.GUTTER,
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    opacity: 0.3,
  },
  orderButton: {
    width: 'auto',
    height: 'auto',
    borderRadius: 10,
  },
  oderContainer: {
    marginTop: Sizes.GUTTER * 2,
    flexGrow: 0,
  },
  orderButtonText: {
    fontSize: 14,
  },
  oderSeparator: {
    marginLeft: Sizes.GUTTER * 2,
  },
  coinAction: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    padding: 0,
    marginLeft: Sizes.GUTTER,
  },
});

type OrderOption = {
  id: string;
  label: string;
  direction: 'asc' | 'desc';
};

const orderList: OrderOption[] = [
  {
    id: 'name',
    label: 'Name',
    direction: 'asc',
  },
  {
    id: 'price',
    label: 'Price',
    direction: 'desc',
  },
];

const Home: Screen<'Home'> = () => {
  const [order, setOrderId] = useState<OrderOption>(orderList[0]);
  const coins = useSelector<RootState, Crypto[]>(({ crypto }) =>
    _(crypto).values().compact().orderBy(['isPin', order.id], ['desc', order.direction]).value(),
  );
  const [coinsList, setCoinsList] = useState<Crypto[]>(coins);
  const isFetching = useIsRequestLoading(countActions.FETCH_COINS);
  const isFetched = useIsRequestSucceeded(countActions.FETCH_COINS);

  const dispatch = useDispatch();

  const fetchCoins = (): void => {
    dispatch(countReducer.fetchCoins());
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    if (!isFetched) {
      return;
    }
    setCoinsList(coins);
  }, [isFetched]);

  const onOrderPress = (value: OrderOption) => () => {
    setCoinsList(_.orderBy(coinsList, ['isPin', value.id], ['desc', value.direction]));
    setOrderId(value);
  };

  const onActionPinPress = (value: Crypto) => () => {
    // eslint-disable-next-line no-param-reassign
    value.isPin = !value.isPin;

    setCoinsList(_.orderBy(coinsList, ['isPin', order.id], ['desc', order.direction]));
    dispatch(countReducer.updateCoin(value));
  };

  const renderOrder: ListRenderItem<OrderOption> = ({ item: option }) => (
    <Button
      title={option.label}
      type={option.id === order.id ? 'filled' : 'outlined'}
      style={styles.orderButton}
      titleStyle={styles.orderButtonText}
      onPress={onOrderPress(option)}
    />
  );

  const renderCoins: ListRenderItem<Crypto> = ({ item: coin }) => (
    <Row style={styles.coinContainer}>
      <Image source={{ uri: coin.imageUrl }} style={styles.coinIcon} />
      <Body style={styles.coinName}>{coin.name}</Body>
      <Row style={styles.coinPriceWrapper}>
        <Body style={styles.coinPrice}>{currencyFormat(coin.price)}</Body>
        <FontAwesome
          name={`caret-${coin.evaluation}`}
          size={40}
          color={coin.evaluation === 'up' ? Colors.GREEN : Colors.RED}
        />
      </Row>
      <IconButton
        name={coin.isPin ? 'minus' : 'plus'}
        style={styles.coinAction}
        iconSize={20}
        onPress={onActionPinPress(coin)}
      />
    </Row>
  );

  return (
    <Container>
      <Title style={styles.title}>Cryptos Coins</Title>
      <FlatList
        data={orderList}
        renderItem={renderOrder}
        ItemSeparatorComponent={() => <View style={styles.oderSeparator} />}
        horizontal
        bounces={false}
        style={styles.oderContainer}
      />
      <FlatList
        data={coinsList}
        style={styles.coins}
        refreshing={isFetching}
        onRefresh={fetchCoins}
        renderItem={renderCoins}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </Container>
  );
};

export default Home;
