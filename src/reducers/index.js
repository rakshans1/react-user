import {combineReducers} from 'redux';

import authReducer from './authReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer
});

export default rootReducer;