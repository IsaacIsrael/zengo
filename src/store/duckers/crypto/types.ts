/* eslint-disable @typescript-eslint/ban-types */
import { AnyAction } from 'redux';
import { Crypto } from '../../../types/Cryto';

export type State = Record<string, Crypto | never | undefined>;

export interface Actions {
  FETCH_COINS: 'FETCH_COINS';
  SET_COINS: 'SET_COINS';
  UPDATE_COIN: 'UPDATE_COIN';
}

export interface FetchCoins extends AnyAction {
  type: Actions['FETCH_COINS'];
}

export interface SetCoins extends AnyAction {
  type: Actions['SET_COINS'];
  coins: Crypto[];
}

export interface UpdateCoin extends AnyAction {
  type: Actions['UPDATE_COIN'];
  coins: Crypto;
}

export interface Reducers {
  fetchCoins(): FetchCoins;
  setCoins(coins: Crypto[]): SetCoins;
  updateCoin(coin: Crypto): UpdateCoin;
}
