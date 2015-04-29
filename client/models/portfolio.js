'use strict';

angular.module('eTrade')
.factory('Portfolio', function($rootScope, $firebaseArray, $firebaseObject, $window){

  function Portfolio(){
  }
  //called from controller
  Portfolio.getStocks = function(portfolio){
    //points to Firebase and sets it equal to fbPortfolios
    var fbPortfolios = $rootScope.fbUser.child('portfolios/' + portfolio);
    //
    return $firebaseArray(fbPortfolios);
  };
  //
  Portfolio.addStock = function(stock, portfolio){
    var fbPortfolios = $rootScope.fbUser.child('portfolios/' + portfolio);
    var afPortfolios = $firebaseArray(fbPortfolios);

    stock.purchasedOn = $window.Firebase.ServerValue.TIMESTAMP;
    return afPortfolios.$add(stock);
  };

  //called from the controller
  Portfolio.add = function(name){
    //creates a new array of names if no array exists
    //if current array exists then splits array into array of strings
    var names = $rootScope.afUser.names ? $rootScope.afUser.names.split(',') : [];
    //pushes new name into array of strings: "names"
    names.push(name);
    //joins modified array of strings into array seperated by a ','
    $rootScope.afUser.names = names.join(',');
    //saves new array to the database
    return $rootScope.afUser.$save();
  };
  Portfolio.deleteStock = function(stockToSell, portfolio, idx, key){
    var fbPortfolio = $rootScope.fbUser.child('portfolios/' + portfolio);
    var fbStock = fbPortfolio.child(key);
    var afStock = $firebaseObject(fbStock);
    afStock.$loaded().then(function(){
      afStock.$remove();
    });
  };

  return Portfolio;
});
