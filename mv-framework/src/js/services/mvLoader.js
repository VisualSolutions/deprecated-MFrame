/**
 * Created by alex.depatie on 5/22/15.
 */
 'use strict';

angular
    .module('mvFramework')
    .service('mvLoader', function($http, errorHandler) {
      var service = this;

      service.loadConfig = loadConfig;

      return service;


      function loadConfig() {
        console.log('load confog called');
        return $http.get('config.json').success(function(data) {
              console.log(data);
              return data;
            }).error(function() {
              errorHandler.report(101);
            });;
      }
    });
