angular.module('MyApp.login.controllers', [])

.controller('LoginCtrl', function($rootScope, $scope, Fire, Auth, $ionicLoading, $location) {
  $scope.Login = function(user) {
    console.log(user);
    if (user && user.email && user.password) {
      $ionicLoading.show({
        template: 'Signing In...'
      });
      Auth.$authWithPassword({
        email: user.email,
        password: user.password
      }).then(function(authData) {
        console.log("Logged in as:" + authData.uid);
        Fire.child("users").child(authData.uid).once('value', function (snapshot) {
            var val = snapshot.val();
            $rootScope.loggedInUser = val;
        });
        $ionicLoading.hide();
        $location.path("/app/playlists");
      }).
      catch (function(error) {
        alert("Authentication failed:" + error.message);
        $ionicLoading.hide();
      });
    } else
      alert("Please enter email and password both");
  }
});
