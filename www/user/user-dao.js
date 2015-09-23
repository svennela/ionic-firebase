
'use strict';
angular.module('MyApp.services').factory('UserDao',
  function(FIREBASE_ROOT) {
    var usersRef = new Firebase(FIREBASE_ROOT);
    return usersRef;
  });
