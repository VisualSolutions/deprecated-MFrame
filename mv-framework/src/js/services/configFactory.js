/**
 * Created by alex.depatie on 5/25/15.
 */
'use strict';

angular
    .module('mvFramework')
    .factory('mvConfig', function(mvLoader) {
      var scope = this;

      scope.config = null;

      scope.loadConfig = loadConfig;
      scope.getField = getField;

      return scope;

      function loadConfig() {
       scope.config = angular.copy(mvLoader.loadConfig());
      }

      function getField(path) {
        // check for JSON here
        angular.forEach(scope.config.fields, function() {

        })
      }
    });