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
      $avatar = $el.find('.avatar');

      //$a.hover(function(){
        //$avatar("box-shadow",$scope.tweet.color+" 0 0 0 4px");
        //$a.css("color",$scope.tweet.color);
      //});
    }
  };
});
