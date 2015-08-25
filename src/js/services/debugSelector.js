/**
 * Created by alex.depatie on 8/25/15.
 */
'use strict';

angular.module('mvFramework')
  .factory('debugSelector', function() {
      var scope = this;

      scope.debug = false;

      scope.setDebug = setDebug;


      return scope;

      ///////

      function setDebug(option) {
        scope.debug = option;
      }
    });
