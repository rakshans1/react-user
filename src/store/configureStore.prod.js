import {createStore} from 'redux';
import reducers from '../reducers';

export default function() {
  return createStore(reducers);
}
