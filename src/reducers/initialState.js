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
  registration : {
    registrationStatus: '',
    registrationError :'',
    registrationStatus: false
  },
  login : {
    loginStatus: '',
    loginError :'',
    loginStatus: false
  }
};
