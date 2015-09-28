angular.module('MyApp.orgs.controllers', [])

.controller('OrganizationsCtrl', function($scope, Fire, Auth, $ionicLoading,
  $firebaseObject,$firebaseArray,$location,$rootScope,OrgFactory,MembersFactory,$state) {

    console.log('OrganizationsCtrl');
    console.log($rootScope.authData);

    $scope.organizations = $firebaseArray(OrgFactory.child("users").child($rootScope.authData.uid).child('organizations'));

    /*
         console.log($scope.organizations);


         $scope.organizations.$loaded()
        .then(function(){
            angular.forEach($scope.organizations, function(org) {
                console.log(org);
            })
        });
        */ 
     //var allorgs = $firebaseArray(OrgFactory.child("organizations").child('about'));


     //console.log(allorgs);



});
