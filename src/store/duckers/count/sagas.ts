/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { all, put, select, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import Logger from '../../../helper/Logger';
import { Creators as requestsReducer } from '../requests';
import { Creators as reducer, Types as Actions } from '.';
import { AddCount, RemoveCount } from './types';
import sleep from '../../../helper/sleep';
import { RootState } from '../../rootReducer';

function* addCount(action: AddCount) {
  try {
    Logger.info('Add Count: Start adding the count');
    const value: number = yield select(({ count }: RootState) => count.value);
    yield put(requestsReducer.requestStarted(action));
    Logger.debug('Add Count: Sample how to add');
    yield sleep(1 * 1000);
    yield put(reducer.setValue(value + action.value));
    yield put(requestsReducer.requestSucceeded(action));
    Logger.success('Add Count: Add with success');
  } catch (e) {
    const error = e as Error;

    Logger.error('Add Count: Error to onboard to device', error.message);

    yield put(requestsReducer.requestFailed(action));
  } finally {
    yield put(requestsReducer.requestFinished(action));
  }
}

function* removeCount(action: RemoveCount) {
  try {
    Logger.info('Remove Count: Start adding the count');
    const value: number = yield select(({ count }: RootState) => count.value);
    yield put(requestsReducer.requestStarted(action));
    Logger.debug('Remove Count: Sample how to remove');
    yield sleep(1 * 1000);
    yield put(reducer.setValue(value - action.value));
    yield put(requestsReducer.requestSucceeded(action));
    Logger.success('Remove Count: Add with success');
  } catch (e) {
    const error = e as Error;

    Logger.error('Remove Count: Error to onboard to device', error.message);

    yield put(requestsReducer.requestFailed(action));
  } finally {
    yield put(requestsReducer.requestFinished(action));
  }
}

export default function* countSaga() {
  yield all([takeLatest(Actions.ADD_COUNT, addCount), takeLatest(Actions.REMOVE_COUNT, removeCount)]);
}
