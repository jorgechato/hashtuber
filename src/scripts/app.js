angular.module("hashtuber", ['ui.router','ngRoute'])
.constant('Config', {
  apiBase: '/app/search/',
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
  //.state('hashtag',{
    //url:'/{hashtag}?',
    //templateUrl:'../views/base/_tweets.html',
    //controller:'hashtagCtrl',
    //params:{
      //hashtag:{squash:true}
    //}
  //})
  $stateProvider
  .state('hashtag',{
    url:'/',
    templateUrl:'../views/base/_tweets.html',
    controller:'hashtagCtrl'
  });

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
});
