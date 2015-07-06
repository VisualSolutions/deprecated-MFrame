/**
 * Created by alex.depatie on 5/25/15.
 */
'use strict';

angular
    .module('mvFramework')
    .factory('configFactory', function(mvLoader, errorHandler, $q) {
      var scope = this;

      scope.config = null;

      scope.getComponentConfig = getComponentConfig;

      return scope;

      function loadConfig() {
        var d = $q.defer();
        mvLoader.loadConfig().then(function(response) {
          d.resolve(response.data);
        })
        return d.promise;
      }

      function getComponentConfig(path) {
        var d = $q.defer();
        console.log('componentconfig called');
        if(scope.config === null) {
          loadConfig().then(function(data) {
            scope.config = data;

            d.resolve(scope.config.components.filter(function(val) {
              return val.path === path;
            })[0]);
          })
        } else {

          d.resolve(scope.config.components.filter(function(val) {
            return val.path === path;
          })[0]);
        }
        return d.promise;
      }
    });
