
 'use strict';

angular
    .module('mvFramework')
    .service('mvLoader', function($http, errorHandler) {
      var service = this;

      service.loadConfig = loadConfig;

      return service;


      function loadConfig() {
        console.log('load config called');
        return $http.get('mframe.json').success(function(data) {
              console.log(data);
              return data;
            }).error(function() {
              errorHandler.report(101);
            });
      }
    });
