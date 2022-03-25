import { AnyAction } from 'redux';
import { ActionRequest } from '../../../types/Request';

export type State = Record<string, ActionRequest | never>;

export interface Actions {
  REQUEST_STARTED: 'REQUEST_STARTED';
  REQUEST_SUCCEEDED: 'REQUEST_SUCCEEDED';
  REQUEST_FAILED: 'REQUEST_FAILED';
  REQUEST_FINISHED: 'REQUEST_FINISHED';
}

export interface RequestStarted extends AnyAction {
  type: Actions['REQUEST_STARTED'];
  action: AnyAction;
}

export interface RequestSucceeded extends AnyAction {
  type: Actions['REQUEST_SUCCEEDED'];
  action: AnyAction;
}

export interface RequestFailed extends AnyAction {
  type: Actions['REQUEST_FAILED'];
  action: AnyAction;
  message?: string;
}

export interface RequestFinished extends AnyAction {
  type: Actions['REQUEST_FINISHED'];
  action: AnyAction;
}

export interface Reducers {
  requestStarted(action: AnyAction): RequestStarted;
  requestSucceeded(action: AnyAction): RequestSucceeded;
  requestFailed(action: AnyAction, error?: string): RequestFailed;
  requestFinished(action: AnyAction): RequestFinished;
}
