/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ListRenderItem, StyleSheet, View } from 'react-native';

import { useSelector } from 'react-redux';
import { Screen } from '../types/Navigation';
import Container from '../components/Container';
import { Sizes } from '../constants/Sizes';
import { RootState } from '../store';
import { Crypto } from '../types/Cryto';
import Body from '../components/text/Body';
import Row from '../components/Row';
import currencyFormat from '../helper/currencyFormat';
import dateFormat from '../helper/dateFormat';
import Title from '../components/text/Title';
import cryptoServices from '../services/cryptoServices';
import Logger from '../helper/Logger';
import { CryptoQuote } from '../types/CryptoQuote';
import { Colors } from '../constants/Colors';
import Small from '../components/text/Small';

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Sizes.GUTTER,
  },
  image: {
    width: 50,
    aspectRatio: 1,
    marginRight: Sizes.GUTTER * 0.5,
  },
  quote: {
    paddingHorizontal: Sizes.GUTTER * 0.25,
    paddingVertical: Sizes.GUTTER,
  },
  quotePrice: {
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: Sizes.GUTTER,
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    opacity: 0.3,
  },
});

const CryptoDetails: Screen<'CryptoDetails'> = ({ route }) => {
  const { coinId } = route.params;
  const coin = useSelector<RootState, Crypto | undefined>(({ crypto }) => crypto[coinId]);
  const [history, setHistory] = useState<CryptoQuote[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);

  const fetchHistory = async (day: number): Promise<void> => {
    try {
      Logger.info('Fetch History: Start fetching');
      setFetching(true);
      const quotes = await cryptoServices.fetchCryptoHistory(coin?.id || '', day);

      setHistory(quotes);
      setFetching(false);
      Logger.success('Fetch History: Fetch with success');
    } catch (e) {
      const error = e as Error;

      Logger.error('Fetch History: Error to fetch', error.message);
    }
  };

  useEffect(() => {
    fetchHistory(6);
  }, []);

  const onEndReached = (): void => {
    console.log('aqui', history.length);
    if (history.length > 7) {
      return;
    }
    fetchHistory(29);
  };

  const renderQuotes: ListRenderItem<CryptoQuote> = ({ item: quote }) => (
    <View style={styles.quote}>
      <Small> {dateFormat(quote.date)}</Small>
      <Body style={styles.quotePrice}>{currencyFormat(quote.price)}</Body>
    </View>
  );

  const renderLoading = (): React.ReactElement => <ActivityIndicator size="large" />;

  return (
    <Container
      title={
        <Row style={styles.header}>
          <Image source={{ uri: coin?.imageUrl }} style={styles.image} />
          <Title>{coin?.name}</Title>
        </Row>
      }
    >
      <FlatList
        data={history}
        renderItem={renderQuotes}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0}
        ListFooterComponent={fetching ? renderLoading : undefined}
      />
    </Container>
  );
};

export default CryptoDetails;
