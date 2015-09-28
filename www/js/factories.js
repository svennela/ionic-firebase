angular.module('MyApp.factories', [])
  .factory("Fire", function($firebaseAuth,FIREBASE_ROOT) {
    var usersRef = new Firebase(FIREBASE_ROOT);
    return usersRef;
  })
  .factory("Auth", function($firebaseAuth,FIREBASE_ROOT) {
    var usersRef = new Firebase(FIREBASE_ROOT);
    return $firebaseAuth(usersRef);
  })
  .factory("Playlists", function($firebaseArray,FIREBASE_ROOT) {
    var playlistsRef = new Firebase(FIREBASE_ROOT +"/playlists");
    return $firebaseArray(playlistsRef);
  })
    .factory('OrgFactory', function ($firebaseArray, $q,FIREBASE_ROOT) {
            var ref = new Firebase(FIREBASE_ROOT);

            return ref;
      })
      .factory('MyOrgFactory', function ($firebaseArray, $q,FIREBASE_ROOT) {
             var ref = {};
             var fb = new Firebase(FIREBASE_ROOT);
             var ref = fb.child("organizations");
             return {
                 ref: function () {
                     return ref;
                 },
                 getOrganizations: function (authData) {
                     if (authData) {
                         var myorgs = $firebaseArray(ref);
                         return myorgs;
                     }
                 },
                 getOrganization: function (authData) {
                     var deferred = $q.defer();
                     var memberRef = ref.child(authData.uid);
                     var organizations = $firebaseArray(ref.child("users").child(authData.uid).child('organizations'));

                     memberRef.once("value", function (snap) {
                         deferred.resolve(snap.val());
                     });
                     return deferred.promise;
                 },
             };
        })
  .factory('MembersFactory', function ($firebaseArray, $q,FIREBASE_ROOT) {
    var fb = new Firebase(FIREBASE_ROOT);
    var ref = fb.child("users");
    return {
        ref: function () {
            return ref;
        },
        getMembers: function (authData) {
            if (authData) {
                var members = $firebaseArray(ref);
                return members;
            }
        },
        getMember: function (authData) {
          console.log(authData);
            var deferred = $q.defer();
            var memberRef = ref.child(authData.uid);
            memberRef.once("value", function (snap) {
                deferred.resolve(snap.val());
            });
            return deferred.promise;
        },
    };
})
  .factory("Playlist", function($firebaseObject,FIREBASE_ROOT) {
    return {
      get: function(id) {
        var playlistRef = new Firebase(FIREBASE_ROOT +"/playlists"+ id);
        return $firebaseObject(playlistRef);
      }
    }
  });
