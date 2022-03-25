import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import requestsReducers, { State as RequestsState } from './duckers/requests';
import countReducers, { State as CountState } from './duckers/count';

// eslint-disable-next-line @typescript-eslint/ban-types
export type RootState = {
  requests: RequestsState;
  count: CountState;
};

const rootReducer = combineReducers({
  requests: requestsReducers,
  count: countReducers,
});

const persistConfig = {
  key: 'LIFTED_REDUX_STORE',
  storage: AsyncStorageLib,
  whitelist: ['count'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
