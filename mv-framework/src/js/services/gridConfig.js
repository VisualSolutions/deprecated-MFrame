/**
 * Created by alex.depatie on 6/29/15.
 */
'use strict';

angular.module('mvFramework')
  .factory('gridConfig', function() {
      var scope = this;

      scope.components = [];

      scope.setConfig = setConfig;

      return scope;

      /////


      function setConfig(configs) {
        if(typeof configs === "array") {
          configs.map(function(val) {
            checkConfig(val);
          })
        } else {
          checkConfig(configs);
        }

        function checkConfig(config) {
          if(!scope.components.some(function(val, index, array) {
                if(val.pathName === config.pathName) {
                  array.splice(1, index, val);
                  return true;
                }

              })) {
            scope.components.push(config);
          }
        }
      }
    });
