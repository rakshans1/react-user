/*
 * user action types
 */
export const USER_LIST_LOADING = 'USER_LIST_LOADING';
export const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS';
export const USER_ADD = 'USER_ADD';
export const USER_EDIT = 'USER_EDIT';
export const USER_DELETE = 'USER_DELETE';


/*
 * user action creators
 */
export function loadUserList() {
  return {type: USER_LIST_LOADING};
}

export function fetchUserList(users) {
  return {type: USER_LIST_SUCCESS, payload: users};
}

export function editUser(user) {
  return {type: USER_EDIT, payload: user};
}

export function addUser(user) {
  return {type: USER_ADD, payload: user};
}

export function deleteUser(user) {
  return {type: USER_DELETE, payload: user};
}

export const userActions = {
  loadUserList,
  fetchUserList,
  addUser,
  editUser,
  deleteUser
}