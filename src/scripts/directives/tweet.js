angular.module('hashtuber')
.directive('tweet',function(){
  return{
    restrict : 'E',
    replace:true,
    scope: {tweet:'='},
    templateUrl:'../views/base/_tweet.html',
    controller : function($scope,$element){
      $el = $($element);
      $a = $el.find('a');

      $a.hover(function(){
        $(this).css("color",$scope.tweet.color);
      },function(){
        $(this).css("color","#262626");
      });
    }
  };
});
