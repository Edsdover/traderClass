'use strict';

angular.module('eTrade')
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url: '/', templateUrl: '/views/general/home.html'})
  .state('about', {url: '/about', templateUrl: '/views/general/about.html'})
  .state('faq', {url: '/faq', templateUrl: '/views/general/faq.html'})
  .state('contact', {url: '/contact', templateUrl: '/views/general/contact.html'})
  .state('register', {url: '/register', templateUrl: '/views/users/users.html', controller: 'UsersCtrl'})
  .state('login', {url: '/login', templateUrl: '/views/users/users.html', controller: 'UsersCtrl'})
  .state('profile', {url: '/profile', templateUrl: '/views/profile/profile.html', controller: 'ProfileCtrl'})
  //when doing parent child states order matters
  //empty container
  //abstract true measn you cannot go to this state and he is the parent
  .state('portfolios', {url: '/portfolios', templateUrl: 'views/portfolios/portfolios.html', abstract: true})
  //This is a child of about state because of the .list
  //he inherits the parent URL
  //his job is to list all the portfolios
  .state('portfolios.list', {url: '', templateUrl: 'views/portfolios/portfolios-list.html', controller: 'PortfoliosListCtrl'})
  //
  .state('portfolios.new', {url: '/new', templateUrl: 'views/portfolios/portfolios-new.html', controller: 'PortfoliosNewCtrl'})
  //this state shows the portfolios
  //url
  .state('portfolios.show', {url: '/{name}', templateUrl: 'views/portfolios/portfolios-show.html', controller: 'PortfoliosShowCtrl'});
});
