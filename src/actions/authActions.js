/*
 * auth action types
 */
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
export const AUTH_USER_DESTROY = 'AUTH_USER_DESTROY';


/*
 * auth action creators
 */
export function authSuccess(token) {
  return {type: AUTH_USER_SUCCESS, payload: token};
}


export function authDestroy(token) {
  return {type: AUTH_USER_DESTROY};
}