import {createStore, combineReducers, compose} from 'redux';
import reducers from '../reducers';
import reducerRegistry  from '../reducers/reducerRegister';

export default function() {
const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

  const enhancers = [reduxDevtools];

  const composedEnhancers = compose(...enhancers);

  const store = createStore(reducers, undefined, composedEnhancers);

  //Replace the store's reducer whenever a new reducer is registered.
  reducerRegistry.setChangeListener(reducers => {
    store.replaceReducer(combineReducers(reducers));
  });

  return store;
}
