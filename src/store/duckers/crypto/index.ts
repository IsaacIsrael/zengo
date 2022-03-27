import _ from 'lodash';
import { createActions, createReducer } from 'reduxsauce';
import { Actions, Reducers, State, SetCoins, UpdateCoin } from './types';

// Export Saga
export { default as cryptoSaga } from './sagas';

// Create Initial state
export type { State };

const INITIAL_STATE: State = {
  BTC: undefined,
  ETH: undefined,
  ETC: undefined,
  ADA: undefined,
  SOL: undefined,
};

// Create action Types and Creators
export const { Types, Creators } = createActions<Actions, Reducers>({
  fetchCoins: [],
  setCoins: ['coins'],
  updateCoin: ['coin'],
});

// Create Reducer
const setCoins = (state = INITIAL_STATE, { coins }: SetCoins): State => {
  const coinsHash = _.keyBy(coins, 'id');
  return {
    ...state,
    ...coinsHash,
  };
};

const updateCoin = (state = INITIAL_STATE, { coin }: SetCoins): State => {
  return {
    ...state,
    [coin.id]: coin,
  };
};

export default createReducer(INITIAL_STATE, {
  [Types.SET_COINS]: setCoins,
  [Types.UPDATE_COIN]:updateCoin
});
