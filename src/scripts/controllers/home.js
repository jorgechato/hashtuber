angular.module('hashtuber')
.controller('homeCtrl',function($scope,$element,randomcolor){
  $el = $($element);
  $info = $el.find('h2');
  $info.css("color",randomcolor.getRandomColor());
});
