import {push} from 'react-router-redux';
import firebaseApi from '../api/firebase';
import * as types from '../config/constants';
import {ajaxCallError, beginAjaxCall} from './ajaxStatus';
import {notify} from './notifications';
import {providerLoginSuccess, userLoadedSuccess, userCreated} from './user';
import CreateClassRoom from "../containers/CreateClassRoom";
import {classCreationCallSuccess, getAllClassesCallSuccess} from '../actions/classRoomAction';


export function createRoom(roomNumber) {
  debugger;
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.createRoom(roomNumber)
      .then((currentClassRoom) => {
        debugger;
        dispatch(classCreationCallSuccess(currentClassRoom));
        dispatch(push('/createQuestion'));
        /*dispatch(loginCallSuccess());
        dispatch(notify(`Welcome ${result.displayName}`));
          dispatch(authLoggedIn());*/
      })
      .catch(error => {
        debugger;
        // dispatch(loginCallError(error));
        console.log(error);
      });
  };
}

export function getAllClasses() {
  debugger;
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.getAllClasses()
      .then((listofClasses) => {
        debugger;
        //dispatch(notify(`Your current class room ${currentClassRoom} is Deleted`));
        //dispatch(push('/resultsPage'));

        dispatch(getAllClassesCallSuccess(listofClasses));

          //dispatch(authLoggedIn());
      })
      .catch(error => {
        debugger;
        // dispatch(loginCallError(error));
        console.log(error);
      });
  };
}


export function saveQuiz(questions, currentClassRoom) {
  debugger;
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.pushQuestionsToDatabase(questions, currentClassRoom)
      .then((result) => {
        debugger;
        dispatch(notify(`Quiz for your class room ${currentClassRoom} is saved successfully`));
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


export function hostQuiz(roomNumber) {
  debugger;
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.hostQuiz(roomNumber)
      .then((hostedResult) => {
        debugger;
        //dispatch(hostQuiz());
        /*dispatch(loginCallSuccess());
        dispatch(notify(`Welcome ${result.displayName}`));
          dispatch(authLoggedIn());*/
      })
      .catch(error => {
        debugger;
        // dispatch(loginCallError(error));
        console.log(error);
      });
  };
}



export function endHostedQuiz(roomNumber) {
  debugger;
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.endHostedQuiz(roomNumber)
      .then((hostedResult) => {
        debugger;
        //dispatch(hostQuiz());
        /*dispatch(loginCallSuccess());
        dispatch(notify(`Welcome ${result.displayName}`));
          dispatch(authLoggedIn());*/
      })
      .catch(error => {
        debugger;
        // dispatch(loginCallError(error));
        console.log(error);
      });
  };
}

export function resetHostedQuiz(roomNumber) {
  debugger;
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.resetHostedQuiz(roomNumber)
      .then((hostedResult) => {
        debugger;
        //dispatch(hostQuiz());
        /*dispatch(loginCallSuccess());
        dispatch(notify(`Welcome ${result.displayName}`));
          dispatch(authLoggedIn());*/
      })
      .catch(error => {
        debugger;
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
