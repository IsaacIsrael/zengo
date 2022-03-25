/* eslint-disable @typescript-eslint/ban-types */
import { AnyAction } from 'redux';

export type State = {
  value: number;
};

export interface Actions {
  SET_VALUE: 'SET_VALUE';
  ADD_COUNT: 'ADD_COUNT';
  REMOVE_COUNT: 'REMOVE_COUNT';
}

export interface SetValue extends AnyAction {
  type: Actions['SET_VALUE'];
  value: number;
}

export interface AddCount extends AnyAction {
  type: Actions['ADD_COUNT'];
  value: number;
}

export interface RemoveCount extends AnyAction {
  type: Actions['REMOVE_COUNT'];
  value: number;
}

export interface Reducers {
  setValue(value: number): SetValue;
  addCount(value: number): AddCount;
  removeCount(value: number): RemoveCount;
}
