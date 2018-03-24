import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import ajaxCallsInProgress from './ajaxStatus';
import auth from './auth';
import notifications from './notifications';
import routesPermissions from './routesPermissions';
import user from './user';
import registrationReducer from './registration';
import loginReducer from './login';
import classRoomReducer from './room';


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
});

export default rootReducer;
