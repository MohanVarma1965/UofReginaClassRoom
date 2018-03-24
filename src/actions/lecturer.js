import {push} from 'react-router-redux';
import firebaseApi from '../api/firebase';
import {beginAjaxCall} from './ajaxStatus';
import {notify} from './notifications';
import {classCreationCallSuccess, getAllClassesCallSuccess} from './room';


export function createRoom(roomNumber) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.createRoom(roomNumber)
      .then((currentClassRoom) => {
        dispatch(classCreationCallSuccess(currentClassRoom));
        dispatch(push('/createQuestion'));
      })
      .catch(error => {
        // dispatch(loginCallError(error));
        // console.log(error);
      });
  };
}

export function getAllClasses() {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.getAllClasses()
      .then((listofClasses) => {
        dispatch(getAllClassesCallSuccess(listofClasses));
      })
      .catch(error => {
        // dispatch(loginCallError(error));
        // console.log(error);
      });
  };
}


export function saveQuiz(questions, currentClassRoom) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.pushQuestionsToDatabase(questions, currentClassRoom)
      .then((result) => {
        dispatch(notify(`Quiz for your class room ${currentClassRoom} is saved successfully`));
        dispatch(push('/lecturerHomepage'));
      })
      .catch(error => {
        // dispatch(loginCallError(error));
        // console.log(error);
      });
  };
}


export function hostQuiz(roomNumber) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.hostQuiz(roomNumber)
      .then((hostedResult) => {
        //dispatch(hostQuiz());
      })
      .catch(error => {
        // dispatch(loginCallError(error));
        // console.log(error);
      });
  };
}


export function endHostedQuiz(roomNumber) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.endHostedQuiz(roomNumber)
      .then((hostedResult) => {
        //dispatch(hostQuiz());
      })
      .catch(error => {
        // dispatch(loginCallError(error));
        // console.log(error);
      });
  };
}

export function resetHostedQuiz(roomNumber) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.resetHostedQuiz(roomNumber)
      .then((hostedResult) => {
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
