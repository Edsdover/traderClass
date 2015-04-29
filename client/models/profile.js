'use strict';

angular.module('eTrade')
.factory('Profile', function($rootScope, $firebaseObject){

  function Profile(){
  }

  Profile.deposit = function(amount){
    //if the user doesnt have a balance, set to 0
    if(!$rootScope.afUser.balance){
      $rootScope.afUser.balance = 0;
    }
    //if user has balance, add deposit to balance
    $rootScope.afUser.balance += amount;
    //save the new number
    return $rootScope.afUser.$save();
  };
  //saves the profile data to firebase
  Profile.save = function(profile){
    $rootScope.afUser.profile = profile;
    return $rootScope.afUser.$save();
  };

  return Profile;
});
