import { createActions, createReducer } from 'reduxsauce';
import _ from 'lodash';
import { Actions, Reducers, RequestFailed, RequestFinished, RequestStarted, State } from './types';

// Create Initial state
export type { State };

const INITIAL_STATE: State = {};

// Create action Types and Creators
export const { Types, Creators } = createActions<Actions, Reducers>({
  resetStore: null,
  requestStarted: ['action'],
  requestSucceeded: ['action'],
  requestFailed: ['action', 'error'],
  requestFinished: ['action'],
  requestFailedClean: ['action'],
});

// Create Reducer
const requestStarted = (state = INITIAL_STATE, { action }: RequestStarted): State => {
  const requests = _.cloneDeep(state);
  requests[action.type] = {
    action,
    status: 'loading',
  };

  return {
    ...requests,
  };
};

const requestSucceeded = (state = INITIAL_STATE, { action }: RequestFailed): State => {
  const requests = _.cloneDeep(state);
  requests[action.type] = {
    action,
    status: 'succeeded',
  };

  return {
    ...requests,
  };
};

const requestFailed = (state = INITIAL_STATE, { action, message }: RequestFailed): State => {
  const requests = _.cloneDeep(state);
  requests[action.type] = {
    action,
    status: 'failed',
    errorMessage: message,
  };

  return {
    ...requests,
  };
};

const requestFinished = (state = INITIAL_STATE, { action }: RequestFinished): State => {
  const requests = _.cloneDeep(state);
  delete requests[action.type];

  return {
    ...requests,
  };
};

export default createReducer(INITIAL_STATE, {
  [Types.REQUEST_STARTED]: requestStarted,
  [Types.REQUEST_SUCCEEDED]: requestSucceeded,
  [Types.REQUEST_FAILED]: requestFailed,
  [Types.REQUEST_FINISHED]: requestFinished,
});
