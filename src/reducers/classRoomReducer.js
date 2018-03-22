import * as types from '../config/constants';
import initialState from './initialState';

export default function classRoomReducer(state = initialState.classRoom, action) {

  switch (action.type) {

    case types.CLASS_CREATION_SUCCESS:
      return Object.assign({}, state, {
        currentClassRoom: action.payload
      });

    case types.GET_ALL_CLASSES_SUCCESS:
      return Object.assign({}, state, {
        listOfAllClasses: action.payload
      });

    default:
      return state;
  }
}
