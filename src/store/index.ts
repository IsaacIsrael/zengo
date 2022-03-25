import { applyMiddleware, createStore, Store } from 'redux';
import { persistStore, Persistor } from 'redux-persist';

import createSagaMiddleware from 'redux-saga';
import rootReducer, { RootState } from './rootReducer';
import rootSaga from './rootSaga';

const initializeStore = (): { store: Store; persistor: Persistor } => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewareEnhancer = applyMiddleware(sagaMiddleware);

  const store = createStore(rootReducer, middlewareEnhancer);
  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};

const { store, persistor } = initializeStore();

export type { RootState };
export { store, persistor };
