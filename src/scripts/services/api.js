angular.module('hashtuber')
.service('api', function($http,$q,Config){
  return {
    call: function(url,params,data,callback,method){
      var canceler = $q.defer();
      return {
        cancel: function(){
          canceler.resolve();
        }
      };
    }
  };
});
