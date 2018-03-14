import * as types from '../config/constants';
import initialState from './initialState';

export default function classJoinReducer(state = initialState.classRoom, action) {

  debugger;
  switch (action.type) {

    case types.CLASS_JOIN_SUCCESS:
      return Object.assign({}, state, {
        questions : action.payload.questions,
        currentClassRoom : action.payload.currentClassRoom,
        studentID: action.payload.studentID
      });

    default:
      return state;
  }
}