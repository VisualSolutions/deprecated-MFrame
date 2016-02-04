/**
 * Created by alex.depatie on 2/2/16.
 */
'use strict';

angular
    .module('mvFramework')
    .service('yqlService', function($q, $http) {
      var scope = this;

      scope.getData = function() {
        var deferred = $q.defer();
        var query = 'select * from xml where url="http://silo.digichief.com/MMM_1-19-13/NewsII/XML/AllStories.xml"';
        var url = 'http://query.yahooapis.com/v1/public/yql?q=' + fixedEncodeURIComponent(query) + '&format=json';

        console.log(url);

        $http.get(url).success(function(json) {
          console.log(json);
          var entries = json.query.results.AllStories.news;
          deferred.resolve(entries);
        }).error(function(error) {
          console.log(JSON.stringify(error));
        });
        return deferred.promise;
      };



      var fixedEncodeURIComponent = function(str) {
        return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A").replace(/\"/g, "%22");
      };

      return scope;
    });
