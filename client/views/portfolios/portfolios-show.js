'use strict';

angular.module('eTrade')
.controller('PortfoliosShowCtrl', function($scope, $state, Portfolio, Stock){
  //pulling the name of the state from the url(params)
  $scope.name = $state.params.name;
  //calling factory function getStocks
  $scope.stocks = Portfolio.getStocks($state.params.name);
  //watches for a change in stocks, on change calls function computePosition
  $scope.stocks.$watch(computePosition);

  $scope.purchase = function(s){
    var stock = new Stock(s);
    //calls the API in factory
    stock.getQuote()
    .then(function(response){
      // sets the var stock to the last price from API request
      stock.quote = response.data.LastPrice;
      //if the stock purchase is valid then adds the stock to the Portfolio
      //then clears the input
      if(stock.purchase()){
        Portfolio.addStock(stock, $state.params.name).then(clearFields);
      }
    });
  };
  //clears the input boxes
  function clearFields(){
    $scope.stock = null;
  }
  //sets the init to 0
  //multiplies the last price with the number of stock
  function computePosition(){
    $scope.position = $scope.stocks.reduce(function(acc, stock){
      return acc + stock.position;
    }, 0);
  }
});
