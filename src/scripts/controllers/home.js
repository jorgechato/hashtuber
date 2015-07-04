angular.module('hashtuber')
.controller('homeCtrl',function($scope,$element,$translate,randomcolor){

  $scope.info = {
    two : {
      title : $translate.instant('two'),
      text : $translate.instant('info_two')
    },
    one : {
      title : $translate.instant('one'),
      text : $translate.instant('info_one')
    },
    go : {
      title : $translate.instant('go'),
      text : $translate.instant('info_go')
    },
  };

  $el = $($element);
  $info = $el.find('h2');
  $info.css("color",randomcolor.getRandomColor());

});
