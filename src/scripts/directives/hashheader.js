angular.module('hashtuber')
.directive('hashheader',function(){
  return {
    restrict: 'E',
    replace:true,
    templateUrl:'../views/base/hashheader.html',
    controller : function($scope,middleware,randomcolor,$element,$timeout, $stateParams){
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

      var shareMultiLenguage = {
        "es":"Hazme preguntas, con #HashTuber contesto todas ",
        "en":"#HashTuber a really great tool to play with "
      };
      $scope.socialShare = function(){
        var userLang = navigator.language || navigator.userLanguage;
        if (userLang.includes("es") || userLang.includes("sp")){
          return shareMultiLenguage.es;
        }else return shareMultiLenguage.en;
      };
    }
  };
});
