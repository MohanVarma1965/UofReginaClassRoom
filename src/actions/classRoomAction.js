import * as types from '../config/constants';


export function classCreationCallSuccess(currentClassRoom) {
  return {type: types.CLASS_CREATION_SUCCESS, payload: currentClassRoom};
}

export function classCreationCallError(error) {
  return {type: types.CLASS_CREATION_ERROR};
}

export function classJoinCallSuccess(questions, currentClassRoom, studentID, hosted, endHostedQuiz) {
  return {type: types.CLASS_JOIN_SUCCESS, payload: {questions, currentClassRoom, studentID, hosted, endHostedQuiz}};
}

export function classJoinCallError(error) {
  return {type: types.CLASS_JOIN_ERROR, payload: error};
}


export function getAllClassesCallSuccess(listofAllClasses) {
  return {type: types.GET_ALL_CLASSES_SUCCESS, payload: listofAllClasses};
}


export function getAllClassesCallError(error) {
  return {type: types.GET_ALL_CLASSES_ERROR, payload: error};
}

