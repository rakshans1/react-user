/*
 * user action types
 */
export const USER_LIST_LOADING = 'USER_LIST_LOADING';
export const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS';
export const USER_LIST_ADD = 'USER_LIST_ADD';


/*
 * user action creators
 */
export function loadUserList() {
  return {type: USER_LIST_LOADING};
}

export function fetchUserList(users) {
  return {type: USER_LIST_SUCCESS, payload: users};
}


export function addUserList(user) {
  return {type: USER_LIST_ADD, payload: user};
}

export const userActions = {
  loadUserList,
  fetchUserList,
  addUserList,
}