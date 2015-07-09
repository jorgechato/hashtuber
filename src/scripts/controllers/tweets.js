angular.module('hashtuber')
.controller('tweetCtrl',function($scope,$stateParams,$element,$translate,$timeout,randomcolor,middleware){

  $scope.color = randomcolor.getHeaderColor();
  $scope.background = function(){
    hex = randomcolor.getHeaderColor().replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    result = 'rgba('+r+','+g+','+b+',.1)';
    return result;
  };

  $scope.load = $translate.instant('load');
  $scope.placeholder = $translate.instant('placeholder');
  $scope.button = {
    date : $translate.instant('filter_date'),
    rt: $translate.instant('filter_rt'),
    fav : $translate.instant('filter_fav'),
    ran : $translate.instant('filter_ran'),
    tooltip : $translate.instant('tool_tip_working')
  };
  $scope.text = $translate.instant('notification');

  $scope.reverse = false;
  $scope.sortType = 'tweet.date';
  $scope.moreToLoad = true;

  $scope.order = function(type,rev){
    $scope.reverse = rev;
    $scope.sortType = type;
  };

  $scope.tweets = [];

  $scope.$on('NewSearch',function(){
    $scope.tweets = [];
  });

  $scope.$on('EndSearch',function(error, data){
    angular.forEach(data.tweets,function(tweet){
      $scope.tweets.push(tweet);
    });

    if(data.tweets.length === 0 && $scope.tweets.length > 1){
      $scope.lastTweetSince = $scope.tweets[$scope.tweets.length - 1].tweet.date;

      $scope.moreToLoad = false;

      $timeout(function(){
        $scope.moreToLoad = true;
      },2500);
    }else{ $scope.moreToLoad = true;}
  });

  if ($stateParams.hashtag) {
    middleware.setFilter('hashtag',$stateParams.hashtag);
  }

  middleware.search(true);

  $scope.randomQuestion = function(){
    //var index = Math.floor((Math.random() * ($scope.tweets.length - 1)));
    //$scope.tweets[index]
  };

  $scope.loadMore = function(){
    if($scope.tweets.length > 0){
      middleware.setFilter('since_id',$scope.tweets[$scope.tweets.length - 1].id);
    }else{middleware.setFilter('since_id',0);}
    middleware.loadMore();
  };

});
