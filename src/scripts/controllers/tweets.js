angular.module('hashtuber')
.controller('tweetCtrl',function($scope,$stateParams,$state,$element,$translate,randomcolor,middleware){

  $scope.color = randomcolor.getHeaderColor();

  $scope.load = $translate.instant('load');
  $scope.placeholder = $translate.instant('placeholder');
  $scope.button = {
    date : $translate.instant('filter_date'),
    rt: $translate.instant('filter_rt'),
    fav : $translate.instant('filter_fav'),
    ran : $translate.instant('filter_ran'),
    tooltip : $translate.instant('tool_tip_working')
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
