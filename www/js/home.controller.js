angular.module('MyApp.home.controllers', [])

.controller('HomeCtrl', function($scope, Fire, Auth, $ionicLoading, $firebaseObject,$location,$rootScope,MembersFactory,$state) {
  $scope.user = {};
    console.log($rootScope.authData);

    MembersFactory.getMember($rootScope.authData).then(function (thisuser) {
        console.log( thisuser) ;
        //$scope.user.email = thisuser.email;
        $scope.user.firstname = thisuser.firstname;
        $scope.user.lastname = thisuser.lastname;
        $scope.user.email = thisuser.email;
        $scope.user.datecreated = moment(thisuser.datecreated).format('MMMM D, YYYY');
     });

    

});
