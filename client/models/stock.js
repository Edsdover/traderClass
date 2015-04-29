'use strict';

angular.module('eTrade')
.factory('Stock', function($http, $rootScope){
  //grabs the input symbol
  function Stock(o){
    //sets input to uppercase
    this.symbol = o.symbol.toUpperCase();
    //saves the user input
    this.quantity = o.quantity;
  }
  //api request for stock quote
  Stock.prototype.getQuote = function(){
    return $http.jsonp('http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + this.symbol + '&callback=JSON_CALLBACK');
  };
  //function to validate a purchase
  Stock.prototype.purchase = function(){
    //finds total purchase price of last price * the quantity input
    var total = this.quote * this.quantity;
    //checks if the total is more than the account balance
    if(total <= $rootScope.afUser.balance){
      //if valid the total is subtracted from the balance
      $rootScope.afUser.balance -= total;
      //saves the new balance
      $rootScope.afUser.$save();
      //sets the position to the total
      this.position = total;
      //returns valid if statment is met
      return true;
    }
  };

  return Stock;
});
