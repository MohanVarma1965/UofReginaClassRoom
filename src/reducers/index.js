import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import ajaxCallsInProgress from './ajaxStatus';
import auth from './auth';
import notifications from './notifications';
import routesPermissions from './routesPermissions';
import user from './user';
import registrationReducer from './registrationReducer';
import loginReducer from './loginReducer';
import classRoomReducer from './classRoomReducer';
import classJoinReducer from './classJoinReducer';


const rootReducer = combineReducers({
  ajaxCallsInProgress,
  auth,
  notifications,
  routesPermissions,
  routing: routerReducer,
  user,
  registrationReducer,
  loginReducer,
  classRoomReducer,
  classJoinReducer
});

export default rootReducer;
