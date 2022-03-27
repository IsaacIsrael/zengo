/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import Logger from '../../../helper/Logger';
import { Creators as requestsReducer } from '../requests';
import { Creators as reducer, Types as Actions } from '.';
import { FetchCoins } from './types';
import { RootState } from '../../rootReducer';
import cryptoServices from '../../../services/cryptoServices';
import { Crypto } from '../../../types/Cryto';

function* fetchCoins(action: FetchCoins) {
  try {
    Logger.info('Fetch Coins: Start fetching');
    yield put(requestsReducer.requestStarted(action));

    const coins: string[] = yield select(({ crypto }: RootState) => _.keys(crypto));
    const cryptos: Crypto[] = yield call([cryptoServices, cryptoServices.fetchCryptos], coins);

    const pinCoins: Record<string, Crypto> = yield select(({ crypto }: RootState) =>
      _(crypto)
        .filter((item) => !!item?.isPin)
        .keyBy('id')
        .value(),
    );

    cryptos.forEach((item, index, array) => {
      // eslint-disable-next-line no-param-reassign
      array[index] = {
        ...item,
        isPin: !!pinCoins[item.id],
      };
    });

    yield put(reducer.setCoins(cryptos));
    yield put(requestsReducer.requestSucceeded(action));
    Logger.success('Fetch Coins: Fetch with success');
  } catch (e) {
    const error = e as Error;

    Logger.error('Fetch Coins: Error to fetch', error.message);

    yield put(requestsReducer.requestFailed(action));
  } finally {
    yield put(requestsReducer.requestFinished(action));
  }
}

export default function* countSaga() {
  yield all([takeLatest(Actions.FETCH_COINS, fetchCoins)]);
}
