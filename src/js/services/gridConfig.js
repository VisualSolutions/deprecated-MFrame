
'use strict';

angular.module('mvFramework')
  .factory('gridConfig', function() {
      var scope = this;

      scope.components = [];

      scope.setConfig = setConfig;
      scope.getConfig = getConfig;

      return scope;

      /////


      function setConfig(configs) {
        if(configs instanceof Array) {
          configs.map(function(val) {
            checkConfig(val);
          });
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

      function getConfig(pathName) {
        return scope.components.filter(function(component) {
          return component.pathName === pathName
        })[0];
      }
    });
