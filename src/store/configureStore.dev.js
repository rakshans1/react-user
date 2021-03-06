import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import logger from '../middleware/logger';
import monitorReducerEnhancer from '../enhancers/monitorReducer';
import reducers  from '../reducers';
import reducerRegistry from '../reducers/reducerRegister.js';

export default function() {
  const middlewares = [logger];
  const middlewareEnhancers = applyMiddleware(...middlewares);

  const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

  const enhancers = [middlewareEnhancers, monitorReducerEnhancer, reduxDevtools];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(reducers, undefined, composedEnhancers);

  //Replace the store's reducer whenever a new reducer is registered.
  reducerRegistry.setChangeListener(reducers => {
    store.replaceReducer(combineReducers(reducers));
  });

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(reducers)
    )
  }

  return store
}
