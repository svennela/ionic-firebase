angular.module('MyApp.settings.controllers', [])

.controller('SettingsCtrl', function($scope, Fire, Auth, $ionicLoading, $firebaseObject,$location,$rootScope,MembersFactory,$state) {
  $scope.user = {};
    console.log($rootScope.authData);

  var loaduserdetails = function() {
      MembersFactory.getMember($rootScope.authData).then(function (thisuser) {
          console.log( thisuser) ;
          //$scope.user.email = thisuser.email;
          $scope.user.firstname = thisuser.firstname;
          $scope.user.lastname = thisuser.lastname;
          $scope.user.email = thisuser.email;
          $scope.user.datecreated = moment(thisuser.datecreated).format('MMMM D, YYYY');
       });
   }
   loaduserdetails();
     $scope.saveProfile = function (user) {

      console.log(user);
       var usersRef = MembersFactory.ref();
       var myUser = usersRef.child($rootScope.authData.uid);

       //var syncObject = $firebaseObject(usersRef.child($rootScope.authData.uid));
        //syncObject.$bindTo($scope, "user");

       var sFirstName = user.firstname;
       var sLastName = user.lastname;
       var sEmail = user.email;
       var dtCreated = new Date(user.datecreated);
       var dtUpdated = new Date();
       if (isNaN(dtCreated)) {
           dtCreated = new Date();
       }
       dtCreated = +dtCreated;
       dtUpdated = +dtUpdated;
       var temp = {
           firstname: sFirstName,
           lastname: sLastName,
           email: sEmail,
           datecreated: dtCreated,
           dateupdated: dtUpdated
       }
       myUser.update(temp, function () {
           $state.go('app.setting');
       });
   };

});
