import * as types from '../config/constants';
import {notify} from "./notifications";
import firebaseApi from "../api/firebase";
import {beginAjaxCall} from "./ajaxStatus";
import {authLoggedIn} from "./auth";

export function signInwithEmailPassword(email, password) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.signInwithEmailPassword(email, password)
      .then((result) => {
        localStorage.setItem("token", result.refreshToken);
        //localStorage.setItem("token", result.credential.accessToken);
        dispatch(loginCallSuccess());
        dispatch(notify(`Welcome ${result.displayName}`));
        dispatch(authLoggedIn());
      })
      .catch(error => {
        dispatch(loginCallError(error));
        //console.log(error);
      });
  };
}

export function loginCallSuccess() {
  return {type: types.USER_LOGIN_SUCCESS};
}

export function loginCallError(error) {
  let errorMessage = error && error.message ? error.message : '';
  return {type: types.USER_LOGIN_ERROR, payload: errorMessage};
}
