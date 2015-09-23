'use strict';

angular.module('MyApp.controllers').controller('SignupCtrl',
  function($scope, $q, $state, $ionicLoading, Auth, User, Signup,UserDao) {
    var password = Signup.randomPassword();

    $scope.user = {
      email: ''
    };
    $scope.errorMessage = null;

    $scope.signup = function() {
      $scope.errorMessage = null;

      $ionicLoading.show({
        template: 'Please wait...'
      });

      createAuthUser().then(sendPasswordResetEmail)
                      //.then(login)
                      //.then(createMyAppUser)
                      .catch(handleError);
    };

    function createAuthUser() {
      console.log(Auth);

      return Auth.$createUser({email: $scope.user.email,password: password} );

    }

    function sendPasswordResetEmail(authUser) {
      console.log(authUser);
      Auth.$resetPassword(  {email:$scope.user.email}).then(function() {
        console.log("Password reset email sent successfully!");
        createMyAppUser(authUser);
      }).catch(function(error) {
        console.error("Error: ", error);
      });



    }

    function login(authUser) {
      return Auth.login(authUser.email, password);
    }

    function createMyAppUser(authUser) {
      console.log(authUser);
      UserDao.child("users").child(authUser.uid).set({
            email: authUser.email,
            displayName: 'Test'
        });
    //  return User.create(authUser.uid, authUser.email);
    }


    function goToChangePassword() {
      $ionicLoading.hide();
      $state.go('change-password');
    }

    function handleError(error) {
      switch (error.code) {
        case 'INVALID_EMAIL':
          $scope.errorMessage = 'Invalid email';
          break;
        case 'EMAIL_TAKEN':
          $scope.errorMessage = 'Email already exists';
          break;
        default:
          $scope.errorMessage = 'Error: [' + error.code + ']';
      }

      $ionicLoading.hide();
    }
  });
