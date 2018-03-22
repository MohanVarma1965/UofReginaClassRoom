import {push} from 'react-router-redux';
import firebaseApi from '../api/firebase';
import {beginAjaxCall} from './ajaxStatus';
import {notify} from './notifications';
import {classJoinCallSuccess} from '../actions/classRoomAction';


export function joinRoom(studentID, roomNumber) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.joinClassRoom(studentID, roomNumber)
      .then((currentClassRoom) => {
        dispatch(push('/getandAnswerQuestions'));
        return firebaseApi.databaseQuestionsFetch(studentID, roomNumber).then((resolvedValues) => {
          dispatch(classJoinCallSuccess(resolvedValues[0], roomNumber, studentID, resolvedValues[1], resolvedValues[2]));
        }).catch(error => {
          // dispatch(loginCallError(error));
          // console.log(error);
        });
      })
      .catch(error => {
        // dispatch(loginCallError(error));
        // console.log(error);
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
      })
      .catch(error => {
        // dispatch(loginCallError(error));
        // console.log(error);
      });
  };
}

export function deleteRoom(currentClassRoom) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.deleteRoom(currentClassRoom)
      .then((result) => {
        dispatch(notify(`Your current class room ${currentClassRoom} is Deleted`));
        dispatch(push('/lecturerHomepage'));

      })
      .catch(error => {
        // dispatch(loginCallError(error));
        // console.log(error);
      });
  };
}
