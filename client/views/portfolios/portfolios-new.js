'use strict';

angular.module('eTrade')
.controller('PortfoliosNewCtrl', function($scope, $state, Portfolio){

  $scope.add = function(name){
    //calls function in factory
    Portfolio.add(name)
    //waits for function to run
    .then(function(){
      //after calling factory function, shifts state to portfolios.list
      $state.go('portfolios.list');
    });
  };
});
