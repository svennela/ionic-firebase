angular.module('MyApp.signup.controllers', [])

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

        Auth.$authWithPassword({
          email: user.email,
          password: user.password
        }).then(function(authData) {
              Fire.child("users").child(authData.uid).set({
                  email: user.email,
                  displayName: user.displayname,
                  datecreated: Date.now(),
                  dateupdated: Date.now()
                  });
                  Auth.$unauth();
                  $ionicLoading.hide();
                  alert("User created successfully!");
        }).
        catch (function(error) {
          alert("Authentication failed:" + error.message);
          $ionicLoading.hide();
        });




          //$location.path("/login");
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
});
