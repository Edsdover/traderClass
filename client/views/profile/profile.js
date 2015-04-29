'use strict';

angular.module('eTrade')
.controller('ProfileCtrl', function($scope, Profile){
  //waits for the user to load then calls createScope
  $scope.afUser.$loaded(createScope);
  //watches for changes in the afUser, calls function createScope on change
  $scope.afUser.$watch(createScope);

  $scope.deposit = function(amount){
    //calls deposit function in factory
    Profile.deposit(amount)
    .then(function(){
      //once complete set the input to 0
      $scope.amount = 0;
    });
  };
  //calls the save function in factory
  $scope.save = function(profile){
    Profile.save(profile);
  };
  //
  function createScope(){
    //syncs database profile with local data
    $scope.profile = $scope.afUser.profile;
    //syncs database balance with local data
    $scope.balance = $scope.afUser.balance;
  }
});
