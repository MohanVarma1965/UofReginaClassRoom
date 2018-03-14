import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AboutPage from './containers/AboutPage';
import HomePage from './containers/HomePage';
import NotFound from './containers/NotFoundPage';
import Layout from './containers/Layout';
import ProtectedPage from './containers/AccountPage';
import Register from './containers/RegisterLink'
import LoginWithEmailPassword from './containers/LoginWithEmailPassword';
import CreateQuestion from './containers/CreateQuestion';
import LecturerHomePage from './containers/LecturerHomePage';
import JoinClassRoom from './containers/JoinClassRoom';
import GetandAnswerQuestions from './containers/GetandAnswerQuestions'

export default function Routes(store) {
  return (
    <Route path='/' component={Layout}>
      <IndexRoute component={LoginWithEmailPassword}/>
      <Route path='register' component={Register}/>
      <Route path='login' component={LoginWithEmailPassword}/>
      <Route path='joinClassRoom' component={JoinClassRoom}/>
      <Route path='quiz' component={ProtectedPage}/>
      <Route path='lecturerHomepage' component={LecturerHomePage}/>
      <Route path='createQuestion' component={CreateQuestion}/>
      <Route path='getandAnswerQuestions' component={GetandAnswerQuestions}/>

      CreateQuestions
      <Route path='results' component={ProtectedPage}/>
      <Route path='*' component={NotFound}/>
    </Route>
  );
}
