import { all, fork } from 'redux-saga/effects';
import { countSaga } from './duckers/count';

export default function* rootSaga(): any {
  return yield all([fork(countSaga)]);
}
