import {applyMiddleware, createStore, compose} from 'redux';
//import logger from 'redux-logger'
import logger from '../middleware/logger';
import monitorReducerEnhancer from '../enhancers/monitorReducer';
import reducers from '../reducers';

export default function() {
  const middlewares = [logger];
  const middlewareEnhancers = applyMiddleware(...middlewares);

  const reduxDEvtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

  const enhancers = [middlewareEnhancers, monitorReducerEnhancer, reduxDEvtools];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(reducers, undefined, composedEnhancers);

  if (module.hot) {
    module.hot.accept('../reducers', () => 
      store.replaceReducer(reducers)
    )
  }

  return store
}
