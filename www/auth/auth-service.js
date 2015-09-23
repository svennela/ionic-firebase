'use strict';
angular.module('MyApp.services', ['firebase'])
    .factory("Auth", ["$firebaseAuth", "$rootScope","FIREBASE_ROOT",
    function ($firebaseAuth, $rootScope,FIREBASE_ROOT) {
            var ref = new Firebase(FIREBASE_ROOT);
            return $firebaseAuth(ref);
}]);
