angular.module('hashtuber')
.service('api', function($http,$q,Config){
  return {
    call: function(params, data, callback, method){
      method = method ? method : 'GET';
      var canceler = $q.defer();

      $http({
        url: Config.apiBase,
        method : method,
        params : params.hashtag,
        timeout : canceler.promise,
        data : data
      })
      .success(function(data, status) {
        if (typeof callback == 'function') {
          callback(data);
        }
      });

      return {
        cancel: function(){
          canceler.resolve();
        }
      };
    }
  };
});
