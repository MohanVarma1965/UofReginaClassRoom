import * as types from '../config/constants';
import initialState from './initialState';

export default function registrationReducer(state = initialState.registration, action) {
  switch (action.type) {

    case types.USER_REGISTRATION_ERROR:
      return Object.assign({}, state, { registrationStatus: true, registrationError: ''});

    case types.USER_REGISTRATION_SUCCESS:
      debugger;

      return Object.assign({}, state, {
        registrationStatus : false, registrationError : (action.payload) ? action.payload : "Unknown Error :("
      });

    default:
      return state;
  }
}
