angular.module('hashtuber')
.directive('hashheader',function(){
  return {
    restrict: 'E',
    replace:true,
    templateUrl:'../views/base/hashheader.html',
    controller : function($scope){
      $scope.test = 'fa-camera-retro';
    }
  };
});
