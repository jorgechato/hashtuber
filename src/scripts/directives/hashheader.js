angular.module('hashtuber')
.directive('hashheader',function(){
  return {
    restrict: 'E',
    replace:true,
    templateUrl:'../views/base/hashheader.html',
    controller : function($scope,middleware,randomcolor,$element,$timeout, $stateParams,$translate){
      var $el = $($element);
      var $input = $el.find('#title');

      $input.css("color",randomcolor.getHeaderColor());

      $scope.search = "#" + middleware.getFilter('hashtag');

      $input.on('focus',function(){
        $scope.$apply(function(){
          $scope.search = '#';
        });
      });
      $input.blur(function(){
        $scope.$apply(function(){
          $scope.search = '#' + middleware.getFilter('hashtag');
        });
      });

      $scope.searchHashtag = function(){
        $scope.search = $scope.search.replace(/ /g,"");
        $scope.search = $scope.search.replace(/#/g,"");

        if(middleware.getFilter('hashtag') != $scope.search){
          middleware.setFilter('hashtag',$scope.search);
          middleware.search();
        }
        $timeout(function(){$input.blur();},50);
      };

      $scope.$on('NewSearch', function(){
        $scope.search = '#' + middleware.getFilter('hashtag');
      });

      $scope.color = randomcolor.getHeaderColor();

      $scope.share = {
        socialShare : $translate.instant('share'),
        ToolTip : $translate.instant('tool_tip_share')
      };
      $scope.topLinks = {
        paypal : $translate.instant('beer'),
        github : $translate.instant('power')
      };
    }
  };
});
