angular.module('hashtuber')
.directive('hashheader',function(){
  return {
    restrict: 'E',
    replace:true,
    templateUrl:'../views/base/hashheader.html',
    controller : function($scope,gethashtag,randomcolor,$element,$timeout){
      var $el = $($element);
      var $input = $el.find('#title');

      $input.css("color",randomcolor.getRandomColor());

      $scope.search = '#HashTuber';
      $scope.lastSearch = 'HashTuber';

      $input.on('focus',function(){
        $scope.search = '';
        $scope.$apply();
      });
      $input.blur(function(){
        $scope.search = '#'+$scope.lastSearch;
        $scope.$apply();
      });

      $scope.searchHashtag = function(){
        $scope.search = $scope.search.replace(/ /g,"");
        $scope.search = $scope.search.replace(/#/g,"");
        if($scope.lastSearch != $scope.search){
          $scope.lastSearch = $scope.search;
          $scope.search = '#'+$scope.search;
        }
        $input.blur();
      };
    }
  };
});
