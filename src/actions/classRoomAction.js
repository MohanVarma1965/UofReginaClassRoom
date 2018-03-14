import * as types from '../config/constants';


export function classCreationCallSuccess(currentClassRoom) {
  return { type: types.CLASS_CREATION_SUCCESS, payload : currentClassRoom };
}

export function classCreationCallError(error) {
  return { type: types.CLASS_CREATION_ERROR };
}

export function classJoinCallSuccess(result, currentClassRoom, studentID) {
  debugger;
  return { type: types.CLASS_JOIN_SUCCESS, payload : {result, currentClassRoom,studentID }};
}

export function classJoinCallError(error) {
  debugger;
  return { type: types.CLASS_JOIN_ERROR, payload :error };
}

