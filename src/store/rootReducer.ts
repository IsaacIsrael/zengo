import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import requestsReducers, { State as RequestsState } from './duckers/requests';
import cryptoReducers, { State as CryptoState } from './duckers/crypto';

// eslint-disable-next-line @typescript-eslint/ban-types
export type RootState = {
  requests: RequestsState;
  crypto: CryptoState;
};

const rootReducer = combineReducers({
  requests: requestsReducers,
  crypto: cryptoReducers,
});

const persistConfig = {
  key: 'LIFTED_REDUX_STORE',
  storage: AsyncStorageLib,
  whitelist: ['crypto'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
