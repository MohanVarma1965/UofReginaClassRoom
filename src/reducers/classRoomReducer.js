import * as types from '../config/constants';
import initialState from './initialState';

export default function registrationReducer(state = initialState.classRoom, action) {

  debugger;
  switch (action.type) {

    case types.CLASS_CREATION_SUCCESS:
      return Object.assign({}, state, {
        currentClassRoom : action.payload
      });

    default:
      return state;
  }
}
