import { createActions, createReducer } from 'reduxsauce';
import { Actions, Reducers, State, SetValue } from './types';

// Export Saga
export { default as countSaga } from './sagas';

// Create Initial state
export type { State };

const INITIAL_STATE: State = {
  value: 0,
};

// Create action Types and Creators
export const { Types, Creators } = createActions<Actions, Reducers>({
  setValue: ['value'],
  addCount: ['value'],
  removeCount: ['value'],
});

// Create Reducer
const setValue = (state = INITIAL_STATE, { value }: SetValue): State => {
  return {
    ...state,
    value,
  };
};

export default createReducer(INITIAL_STATE, {
  [Types.SET_VALUE]: setValue,
});
