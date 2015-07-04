angular.module('hashtuber')
.controller('tweetCtrl',function($scope,$stateParams,$state,$element,randomcolor,middleware){

  $scope.color = randomcolor.getHeaderColor();

  var loadMultiLanguage = {
    "es":"CARGAR MÁS",
    "en":"LOAD MORE"
  };
  $scope.loadMore = function(){
    var userLang = navigator.language || navigator.userLanguage;
    if (userLang.includes("es") || userLang.includes("sp")){
      return loadMultiLanguage.es;
    }else return loadMultiLanguage.en;
  };

  $scope.reverse = false;
  $scope.sortType = 'date';

  $scope.order = function(type,rev){
    $scope.reverse = rev;
    $scope.sortType = type;
  };

  $scope.tweets = [];

  $scope.$on('EndSearch',function(error, data){
    $scope.tweets = data.tweets;
  });

  if ($stateParams.hashtag) {
    middleware.setFilter('hashtag',$stateParams.hashtag);
  }

  $scope.$on('NewSearch',function(){
    $state.go('hashtag',{hashtag:middleware.getFilter('hashtag')},{notify:false,reload:false});
  });

  middleware.search();

});
