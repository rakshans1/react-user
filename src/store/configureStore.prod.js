import {createStore, combineReducers} from 'redux';
import reducers from '../reducers';
import reducerRegistry  from '../reducers/reducerRegister';

export default function() {
  const store = createStore(reducers);

  //Replace the store's reducer whenever a new reducer is registered.
  reducerRegistry.setChangeListener(reducers => {
    store.replaceReducer(combineReducers(reducers));
  });

  return store;
}
