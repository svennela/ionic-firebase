'use strict';

angular.module('MyApp', [
  'ionic',
  'firebase',
  'MyApp.services',
  'MyApp.directives',
  'MyApp.controllers'
])
.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'sidemenu/sidemenu.html',
      controller: 'SideMenuCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'signup/signup.html',
      controller: 'SignupCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'login/login.html',
      controller: 'LoginCtrl'
    })
    .state('reset-password', {
      url: '/reset-password',
      templateUrl: 'reset-password/reset-password.html',
      controller: 'ResetPasswordCtrl'
    })
    .state('change-password', {
      url: '/change-password',
      templateUrl: 'change-password/change-password.html',
      controller: 'ChangePasswordCtrl',
    //  resolve: resolve
    })
    .state('app.dashboard', {
      url: '/dashboard',
      views: {
        menuContent: {
          templateUrl: 'dashboard/dashboard.html',
          controller: 'DashboardCtrl',
              resolve: {
            // controller will not be loaded until $waitForAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            'currentAuth': ['Auth', function(Auth) {
              // $waitForAuth returns a promise so the resolve waits for it to complete
              return Auth.$requireAuth();
            }]
          }
        }
      }
    });

  $urlRouterProvider.otherwise('/app/dashboard');
})
.run(function($rootScope, $state, $ionicPlatform,$location, Auth) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory
    // bar above the keyboard for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    Auth.$onAuth(function (authData) {
        console.log('authData');
          console.log(authData);

            if (authData) {
                //console.log("Logged in as:", authData);
                $rootScope.authData = authData;
            } else {
                $state.go("login");
            }
        });


            $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
                console.log(error);
                  if (error === "AUTH_REQUIRED") {
                      $state.go("login"); 
                  }
              });

  });
})
.constant('FIREBASE_ROOT', 'https://errandstest.firebaseio.com');

angular.module('MyApp.services', []);
angular.module('MyApp.directives', []);
angular.module('MyApp.controllers', []);
