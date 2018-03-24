import * as types from '../config/constants';


export function registrationCallSuccess() {
  return {type: types.USER_REGISTRATION_SUCCESS};
}


export function registrationCallError(error) {
  let errorMessage = error && error.message ? error.message : '';
  return {type: types.USER_REGISTRATION_ERROR, payload: errorMessage};
}
