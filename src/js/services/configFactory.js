
'use strict';

angular
    .module('mvFramework')
    .factory('configFactory', function(mvLoader, errorHandler, $q) {
      var scope = this;

      scope.getComponentConfig = getComponentConfig;
      scope.loadConfig = loadConfig;

      return scope;

      function loadConfig() {
        var d = $q.defer();
        if(scope.config === null || typeof scope.config === 'undefined') {
          mvLoader.loadConfig().then(function(response) {
            d.resolve(response.data);
          });
        } else {
          d.resolve(scope.config);
        }
        return d.promise;
      }

      function getComponentConfig(path) {
        var d = $q.defer();
        console.log('componentconfig called');
        if(scope.config === null || typeof scope.config === 'undefined') {
          loadConfig().then(function(data) {
            console.log('the data', data);
            scope.config = data;

            d.resolve(scope.config.components.filter(function(val) {
              return val.path === path;
            })[0]);
          })
        } else {

            console.log('the data', scope.config);
          d.resolve(scope.config.components.filter(function(val) {
            return val.path === path;
          })[0]);
        }
        return d.promise;
      }
    });
