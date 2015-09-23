'use strict';



angular.module('MyApp.services').service('User',
  function($q,  $firebaseArray,$firebase,$firebaseObject,FIREBASE_ROOT, Auth) {
    var usersRef = new Firebase(FIREBASE_ROOT + '/users');
    var currentUser = null;
    var ref = new Firebase(FIREBASE_ROOT);

    this.loadCurrentUser = function() {
      var defer = $q.defer();
      var currentUserRef = usersRef.child(Auth.currentUser.uid);

      currentUser = $firebase(currentUserRef);
      currentUser.$on('loaded', defer.resolve);

      return defer.promise;
    };

    this.create = function(id, email) {

      //  var userref = new Firebase (FIREBASE_ROOT + '/users/' + id);

        //var users = $firebase(usersRef);;





          var profile = {
  				email: email,
  				md5_hash: 'XX'
  			};

          var profileRef = ref.child('profile').child(id);
      			profileRef.set(profile, function (err) {
      				if (err) {
      					deferred.reject(err);
      				} else {
      					deferred.resolve(profile);
      				}
      			});

            return profileRef;
  //  var userRef = ref.child('users').child(id);

  //  var users = $firebaseArray(userRef)
  //  console.log(users);

    //return users.$add({ email: email });
  //  return users.$child(id).$set({ email: email });

      //users.$add({ email: email });
    //  return users.$child(id).$set({ email: email });
    //  return users.$child(id).$set({ email: email });
    };

    this.recordPasswordChange = function() {
      var now = Math.floor(Date.now() / 1000);

      return currentUser.$update({ passwordLastChangedAt: now });
    };

    this.hasChangedPassword = function() {
      return angular.isDefined(currentUser.passwordLastChangedAt);
    };
  });
