angular.module('hashtuber')
.service('middleware',function($http,api,$rootScope){
  var backup = [];

  var filters = {
    hashtag : 'HashTuber'
  };

  var search = function(filters,callback){
    var params = {
      hashtag : filters.hashtag
    };

    return api.call(params,{},function(data){
      //console.log(data);
      if (typeof callback == 'function') {
        callback(data);
      }
    });
  };

  return {
    search : function(){
      $rootScope.$broadcast('NewSearch');
      var question = search(filters,function(data){
        $rootScope.$broadcast('EndSearch', {tweets: data});
      });

      backup.push(question);
    },
    setFilter: function (key, value) {
      filters[key] = value;
    },
    getFilter: function (key) {
      return filters[key];
    },
    getAllFilters: function () {
      return filters;
    },
    filters: filters
  };
});
