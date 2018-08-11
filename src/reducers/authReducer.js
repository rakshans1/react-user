import reducerRegistry from './reducerRegister';
import { AUTH_USER_SUCCESS, AUTH_USER_DESTROY } from '../actions/authActions';

const reducerName = 'auth';
const initialState = {
  isAuthenticated: false,
  token: null
}

function authReducer(state = initialState, action) {
  switch(action.type) {
    case AUTH_USER_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        token: action.payload
      })
    case AUTH_USER_DESTROY:
      return Object.assign({}, state, {
        isAuthenticated: false,
        token: null
      })
    default:
      return state;
  }
}

reducerRegistry.register(reducerName, authReducer);
export default authReducer;
