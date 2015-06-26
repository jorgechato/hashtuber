angular.module('hashtuber')
.service('gethashtag',function($http,api,$rootScope){
  var backup = [];

  var search = function(hashtag,callback){
    var params = {
      hashtag : hashtag
    };

    return api.call(params,{},function(data){
      console.log(data);
      if (typeof callback == 'function') {
        callback(data);
      }
    });
  };
});
