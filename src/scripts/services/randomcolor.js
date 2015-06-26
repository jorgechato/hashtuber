angular.module('hashtuber')
.service('randomcolor', function (Config) {
  return {
    getRandomColor: function () {
      var index = Math.floor((Math.random() * Config.colors.length));
      return Config.colors[index];
    }
  };
});
