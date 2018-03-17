import {push} from 'react-router-redux';
import firebaseApi from '../api/firebase';
import * as types from '../config/constants';
import {ajaxCallError, beginAjaxCall} from './ajaxStatus';
import {notify} from './notifications';
import {providerLoginSuccess, userLoadedSuccess, userCreated} from './user';
import CreateClassRoom from "../containers/CreateClassRoom";
import {classCreationCallSuccess, classJoinCallSuccess} from '../actions/classRoomAction'
import GetandAnswerQuestions from "../containers/GetandAnswerQuestions";


export function joinRoom(studentID, roomNumber) {
  debugger;
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.joinClassRoom(studentID, roomNumber)
      .then((currentClassRoom) => {
//        dispatch(classJoinCallSuccess(currentClassRoom));
             dispatch(push('/getandAnswerQuestions'));
        return firebaseApi.databaseQuestionsFetch(studentID, roomNumber).then((resolvedValues) => {
             dispatch(classJoinCallSuccess(resolvedValues[0], roomNumber, studentID, resolvedValues[1], resolvedValues[2] ));
        }).catch(error => {
          // dispatch(loginCallError(error));
          console.log(error);
        });
        /*dispatch(loginCallSuccess());
        dispatch(notify(`Welcome ${result.displayName}`));
          dispatch(authLoggedIn());*/
      })
      .catch(error => {
        // dispatch(loginCallError(error));
        console.log(error);
      });
  };
}

export function submitQuiz(currentClassRoom, studentID, answers) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.submitQuiz(currentClassRoom, studentID, answers)
      .then((result) => {
        dispatch(notify('Your quiz has been submitted successfully'));
        dispatch(push('/joinClassRoom'));
        /*dispatch(loginCallSuccess());
          dispatch(authLoggedIn());*/
      })
      .catch(error => {
        // dispatch(loginCallError(error));
        console.log(error);
      });
  };
}

export function deleteRoom(currentClassRoom) {
  debugger;
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.deleteRoom(currentClassRoom)
      .then((result) => {
        debugger;
        dispatch(notify(`Your current class room ${currentClassRoom} is Deleted`));
        dispatch(push('/lecturerHomepage'));

        /*dispatch(loginCallSuccess());

          dispatch(authLoggedIn());*/
      })
      .catch(error => {
        debugger;
        // dispatch(loginCallError(error));
        console.log(error);
      });
  };
}
