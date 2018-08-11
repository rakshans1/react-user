import {combineReducers} from 'redux';

import reducerRegistry from './reducerRegister';

import './authReducer';
//import usersReducer from './usersReducer';

//const rootReducer = combineReducers({
//  auth: authReducer,
//  users: usersReducer
//});


const rootReducer = combineReducers(reducerRegistry.getReducers());

export default rootReducer;
