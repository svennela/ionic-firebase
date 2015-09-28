angular.module('MyApp.org.controllers', [])

.controller('OrganizationCtrl', function($scope, Fire, Auth, $ionicLoading,
  $firebaseObject,$location,$rootScope,OrgFactory,MembersFactory,$state) {

    console.log('OrganizationCtrl');
    var user={};
    function waitUntilCreated() {
       var orgsRef = OrgFactory.child("users").child($rootScope.authData.uid).child('organizations');

       orgsRef.on("value", function(snapShot) {
         console.log('value changed');

         if (snapShot.val() !== null) {
           orgsRef.off("value");
           $ionicLoading.hide();
           $state.go('app.setting');
         }

       });
     }

    $scope.register = function(org) {
      console.log(org);
      // $ionicLoading.show();

      MembersFactory.getMember($rootScope.authData).then(function (thisuser) {
          console.log( thisuser) ;
          user=thisuser;
       });

      var orgRef = OrgFactory.child("/organizations");


                var orgRef = orgRef.push({
                 "about": {
                   "name": org.name,
                   "phone": org.phone,
                   "address": org.address
                 }
               }, function(error) {
                 if (error !== null) {
                   console.log(error);
                   console.log("error create new org");
                 } else {





                   console.log("created org"+orgRef.key());
                  console.log(user);

                  // add a new staff entry
                  var staffRef = orgRef.child("staff");
                  var adminRef = staffRef.push({
                    "firstname": user.firstname,
                    "lastname": user.lastname,
                  //  "userId": user.firstname,
                    "email": user.email,
                    "role": 5
                  });

                  var usersRef = MembersFactory.ref();
                   var userRef = usersRef.child($rootScope.authData.uid);
                  // finally push this entry in the users account
                  userRef.child("organizations").child(orgRef.key()).set({
                    "name": org.name,
                    "orgId": orgRef.key(),
                    "staffId": adminRef.key(),
                    "role": 5
                  });

                     /*

                     var usersRef = MembersFactory.ref();
                      var userRef = usersRef.child($rootScope.authData.uid);
                     // finally push this entry in the users account
                     userRef.child("organizations").child(orgRef.key()).set({
                       "name": org.name,
                       "orgId": orgRef.key(),
                     //  "staffId": adminRef.key(),
                       "role": 5
                     });

                     var obj = $firebaseObject(orgRef.child("staff"));

                       obj.firstname = user.firstname;
                       obj.lastname = user.lastname;
                       obj.email = user.email;

                       obj.$save()
                         .then(function(ref) {
                           //waitUntilCreated();
                         })
                         .catch(function(error) {
                           console.log("failed to submit the code for the user");
                         })
                         .finally(function() {});

                         var staffRef = OrgFactory.child("/organizations/"+orgRef.key()+"/staff");
                           var adminRef = staffRef.push({
                             "user.firstname": 'abstract',
                             "user.lastname": 'asdfasfd',
                             "email": 'email',
                             "role": 5
                           });
                         */



         // finally push this entry in the users account
        /* userRef.child("organizations").child(orgRef.key()).set({
           "name": value.info.name,
           "orgId": orgRef.key(),
           "staffId": adminRef.key(),
           "role": 5
         });
         */


                 }

                 });

      /*var obj = $firebaseObject(orgRef);

        obj.name = org.name;
        obj.address = org.address;
        obj.phone = org.phone;

        obj.$save()
          .then(function(ref) {
            waitUntilCreated();
          })
          .catch(function(error) {
            console.log("failed to submit the code for the user");
          })
          .finally(function() {});






          var orgRef = orgRef.push({
           "about": {
             "name": org.name,
             "phone": org.phone,
             "address": org.address
           }
         }, function(error) {
           if (error !== null) {
             console.log(error);
             console.log("error create new org");
           } else {

             console.log("created org");
           }

           });

          */

     };
});
