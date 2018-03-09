import * as types from '../config/constants';


export function registrationCallSuccess() {
  debugger;
  return { type: types.USER_REGISTRATION_SUCCESS };
}


export function registrationCallError(error) {
  debugger;
  let errorMessage = error && error.message ? error.message : '';
  return { type: types.USER_REGISTRATION_ERROR, payload : errorMessage };
}
