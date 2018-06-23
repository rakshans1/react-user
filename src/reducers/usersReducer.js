
import {
  USER_LIST_LOADING,
  USER_LIST_SUCCESS,
  USER_ADD,
  USER_EDIT,
  USER_DELETE
} from '../actions/usersActions';

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
    case USER_ADD:
      return Object.assign({}, state, {
        list: [
          ...state.list,
          action.payload
        ]
      })
    case USER_EDIT:
      return Object.assign({}, state, {
        list: state.list.map((user) => {
          if (user.id === action.payload.id) {
            return Object.assign({}, action.payload)
          }
          return user
        })
      })
    case USER_DELETE:
      return Object.assign({}, state, {
        list: state.list.filter(user => user.id !== action.payload.id)
      })
    default:
      return state;
  }
}

export default authReducer;