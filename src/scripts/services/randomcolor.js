angular.module('hashtuber')
.service('randomcolor', function (Config) {
  var headerColor;
  return {
    getRandomColor: function () {
      var index = Math.floor((Math.random() * Config.colors.length));
      return Config.colors[index];
    },
    setHeaderColor: function(color){
      headerColor = color;
    },
    getHeaderColor : function(){
      return headerColor;
    }
  };
});
