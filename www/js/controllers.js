angular.module('MyApp.controllers', [])


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
