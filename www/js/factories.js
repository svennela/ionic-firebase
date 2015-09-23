angular.module('starter.factories', [])
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
  .factory("Playlist", function($firebaseObject,FIREBASE_ROOT) {
    return {
      get: function(id) {
        var playlistRef = new Firebase(FIREBASE_ROOT +"/playlists"+ id);
        return $firebaseObject(playlistRef);
      }
    }
  });
