/* eslint-disable @typescript-eslint/no-explicit-any */
import { all, fork } from 'redux-saga/effects';
import { cryptoSaga } from './duckers/crypto';

export default function* rootSaga(): any {
  return yield all([fork(cryptoSaga)]);
}
