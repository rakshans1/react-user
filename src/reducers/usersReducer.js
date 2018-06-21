
import { USER_LIST_LOADING, USER_LIST_SUCCESS, USER_LIST_ADD } from '../actions/usersActions';

const initialState = {
  isLoading: false,
  list: []
}

function authReducer(state = initialState, action) {
  switch(action.type) {
    case USER_LIST_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
      })
    case USER_LIST_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        list: action.payload
      })
    default:
      return state;
  }
}

export default authReducer;