angular.module('hashtuber')
.service('middleware',function($http,api,$rootScope){
  var backup = [];

  var filters = {
    hashtag : 'HashTuber',
    since_id : 0
  };

  var search = function(filters,callback){
    var params = {
      hashtag : filters.hashtag,
      since_id : filters.since_id
    };

    return api.call(params,{},function(data){
      if (typeof callback == 'function') {
        callback(data);
      }
    });
  };

  return {
    search : function(doSearch){
      $rootScope.$broadcast('NewSearch');
      if(doSearch){
        var question = search(filters,function(data){
          $rootScope.$broadcast('EndSearch', {tweets: data});
        });

        backup.push(question);
      }
    },
    loadMore : function(){
      $rootScope.$broadcast('LoadMore');
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
