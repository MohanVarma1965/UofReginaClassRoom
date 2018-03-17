import * as types from '../config/constants';


export function classCreationCallSuccess(currentClassRoom) {
  return { type: types.CLASS_CREATION_SUCCESS, payload : currentClassRoom };
}

export function classCreationCallError(error) {
  return { type: types.CLASS_CREATION_ERROR };
}

export function classJoinCallSuccess(questions, currentClassRoom, studentID, hosted, endHostedQuiz) {
  debugger;
  return { type: types.CLASS_JOIN_SUCCESS, payload : {questions, currentClassRoom, studentID, hosted, endHostedQuiz }};
}

export function classJoinCallError(error) {
  debugger;
  return { type: types.CLASS_JOIN_ERROR, payload :error };
}


export function getAllClassesCallSuccess(listofAllClasses) {
  debugger;
  return { type: types.GET_ALL_CLASSES_SUCCESS, payload :listofAllClasses };
}


export function getAllClassesCallError(error) {
  debugger;
  return { type: types.GET_ALL_CLASSES_ERROR, payload :error };
}

