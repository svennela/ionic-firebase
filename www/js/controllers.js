angular.module('starter.controllers', [])
.controller('SignupCtrl', function($scope, Fire, Auth, $ionicLoading, $location) {
  $scope.Signup = function(user) {
    console.log("Create User Function called");
    console.log(user);
    if (user && user.email && user.password) {
      $ionicLoading.show({
        template: 'Signing Up...'
      });

      Auth.$createUser({
        email: user.email,
        password: user.password
      }).then(function(userData) {
        console.log(userData);
        alert("User created successfully!");
        Fire.child("users").child(userData.uid).set({
            email: user.email,
            displayName: user.displayname
        });
        $ionicLoading.hide();
        $location.path("/login");
      }).
      catch (function(error) {
        switch (error.code) {
          case "EMAIL_TAKEN":
            alert("The new user account cannot be created because the email is already in use.");
            break;
          case "INVALID_EMAIL":
            alert("The specified email is not a valid email.");
            break;
          default:
            alert("Error creating user:", error);
        }
        $ionicLoading.hide();
      });
    } else {
      alert("Please fill all details");
    }
  }
})
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
})
.controller('PlaylistsCtrl', function($scope, Playlists) {

  $scope.playlists = Playlists;
  $scope.addPlaylist = function() {
    console.log(Playlists);
    var title = prompt("Add Your Play List");
    if (title) {
      $scope.playlists.$add({
        "title": title
      });
    }
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams, Playlist) {
  $scope.playlist = Playlist.get($stateParams.playlistId);
});
