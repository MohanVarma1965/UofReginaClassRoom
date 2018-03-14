import * as types from '../config/constants';


export function loginCallSuccess() {
  return { type: types.USER_LOGIN_SUCCESS };
}

export function loginCallError(error) {
  let errorMessage = error && error.message ? error.message : '';
  return { type: types.USER_LOGIN_ERROR, payload : errorMessage };
}
