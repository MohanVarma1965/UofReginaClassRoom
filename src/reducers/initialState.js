export default {
  ajaxCallsInProgress: 0,
  auth: {
    currentUserUID: null,
    initialized: false,
    isLogged: false,
  },
  routesPermissions: {
    requireAuth: [
      '/admin',
    ],
    routesRequireAdmin: [
      '/admin',
    ],
  },
  routing: {},
  user: {
    isAdmin: undefined,
  },
  registration: {
    registrationError: '',
    registrationStatus: false
  },
  login: {
    loginError: '',
    loginStatus: false
  },
  classRoom: {
    currentClassRoom: 'default',
    questions: '',
    studentId: '',
    listOfAllClasses: '',
    hosted: '',
    endHostedQuiz: ''
  }
};
