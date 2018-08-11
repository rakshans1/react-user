import {createStore} from 'redux';
import reducers from '../reducers';

export default function() {
  const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

  const enhancers = [reduxDevtools];

  const composedEnhancers = compose(...enhancers);

  return createStore(reducers);
}
