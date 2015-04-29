'use strict';

angular.module('eTrade')
.controller('PortfoliosListCtrl', function($scope){
  //waits for user to sync with firebase then calls following functon.
  $scope.afUser.$loaded(function(){
    //lists the profile array in new scope
    //if the array exists then split on ',', otherwise create empty array
    $scope.names = $scope.afUser.names ? $scope.afUser.names.split(',') : [];
  });
});
