import { push } from 'react-router-redux';
import firebaseApi from '../api/firebase';
import * as types from '../config/constants';
import { ajaxCallError, beginAjaxCall } from './ajaxStatus';
import { notify } from './notifications';
import { providerLoginSuccess, userLoadedSuccess, userCreated } from './user';
import CreateClassRoom from "../containers/CreateClassRoom";


export function createRoom(roomNumber) {
  debugger;
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.cloudDatabasePush(roomNumber)
      .then( (result) => {
          debugger;
        dispatch(push('/createClassRoom'));
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

