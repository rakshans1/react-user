import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger'

import reducers from '../reducers';

export default function() {
  return createStore(reducers, applyMiddleware(logger));
}