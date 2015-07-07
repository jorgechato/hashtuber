angular.module('hashtuber')
.directive('hashheader',function(){
  return {
    restrict: 'E',
    replace:true,
    templateUrl:'../views/base/hashheader.html',
    controller : function($scope,middleware,randomcolor,$element,$timeout, $stateParams, $state, $translate){
      var $el = $($element);
      var $input = $el.find('#title');

      var doSearch = true;

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

        if($stateParams.hashtag){doSearch = true;}else{doSearch = false;}
          middleware.search(doSearch );
        }
        $timeout(function(){$input.blur();},50);
      };

      $scope.$on('NewSearch', function(){
        if(!$stateParams.hashtag){
          $state.go('hashtag',{hashtag:middleware.getFilter('hashtag')});
        }else{
          $state.go('hashtag',{hashtag:middleware.getFilter('hashtag')},{notify:false, reload:false});
        }
        $scope.search = '#' + middleware.getFilter('hashtag');
      });

      $scope.color = randomcolor.getHeaderColor();
      $scope.colorRandom = randomcolor.getRandomColor();

      $scope.share = {
        socialShare : $translate.instant('share'),
        ToolTip : $translate.instant('tool_tip_share')
      };
      $scope.topLinks = {
        paypal : $translate.instant('beer'),
        github : $translate.instant('power'),
        tip: $translate.instant('tip')
      };
    }
  };
});
