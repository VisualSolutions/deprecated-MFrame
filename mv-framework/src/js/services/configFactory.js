/**
 * Created by alex.depatie on 5/25/15.
 */
'use strict';

angular
    .module('mvFramework')
    .factory('configFactory', function(mvLoader) {
      var scope = this;

      scope.config = null;

      scope.loadConfig = loadConfig;
      scope.getField = getField;

      scope.loadConfig();
      return scope;

      function loadConfig() {
       scope.config = angular.copy(mvLoader.loadConfig());
      }

      function getComponentConfig(path) {
        // check for JSON here
        return scope.config.components.filter(function(val) {
          return val.path === path;
        })[0];
      }
    });
