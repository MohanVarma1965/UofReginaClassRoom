import * as types from '../config/constants';
import initialState from './initialState';

export default function loginReducer(state = initialState.login, action) {
  switch (action.type) {
    case types.USER_LOGIN_SUCCESS:
      return Object.assign({}, state, { loginStatus: true, loginError : '' });

    case types.USER_LOGIN_ERROR:
      debugger;
      return Object.assign({}, state, {
        loginStatus : false, loginError : (action.payload) ? action.payload : "Unknown Error :("
      });

    case types.AUTH_LOGGED_OUT_SUCCESS:
      return Object.assign({}, state, { loginStatus: false, loginError : '' });

    default:
      return state;
  }
}
