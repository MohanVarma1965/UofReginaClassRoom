import * as types from '../config/constants';


export function classCreationCallSuccess(currentClassRoom) {
  debugger;
  return { type: types.CLASS_CREATION_SUCCESS, payload : currentClassRoom };
}

export function classCreationCallError(error) {
  debugger;
  return { type: types.CLASS_CREATION_ERROR };
}
