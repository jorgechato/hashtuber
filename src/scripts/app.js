angular.module("hashtuber", ['ui.router','ngRoute','720kb.socialshare','ngSanitize','angulartics','angulartics.google.analytics'])
.constant('Config', {
  apiBase: '/api/search',
  colors: [
    "#6caff1",
    "#ff5967",
    "#ff794d",
    "#5082e5",
    "#be5fb6",
    "#33ccbe",
    "#ffaf40",
    "#68bf60",
    "#cccc52",
    "#f279ac",
    "#7870cc",
    "#548899"
  ]
})
.config(function($stateProvider,$urlRouterProvider,$locationProvider){
  $stateProvider
  .state('hashtag',{
    url:'/search/{hashtag}',
    templateUrl:'../views/base/_tweets.html',
    controller:'tweetCtrl',
    params:{
      hashtag:{squash:true}
    }
  })
  .state('home',{
    url:'/',
    controller:'homeCtrl',
    templateUrl:'../views/base/_home.html'
  });

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
});
