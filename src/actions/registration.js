import * as types from '../config/constants';
import firebaseApi from "../api/firebase";
import {beginAjaxCall} from "./ajaxStatus";


export function registerWithEmailPassword(email, password, displayName) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.registerWithEmailPassword(email, password, displayName)
      .then((result) => {
        dispatch(registrationCallSuccess());
      })
      .catch(error => {
        dispatch(registrationCallError(error));
      });
  };
}

export function registrationCallSuccess() {
  return {type: types.USER_REGISTRATION_SUCCESS};
}


export function registrationCallError(error) {
  let errorMessage = error && error.message ? error.message : '';
  return {type: types.USER_REGISTRATION_ERROR, payload: errorMessage};
}
