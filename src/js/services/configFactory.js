
'use strict';

angular
    .module('mvFramework')
    .factory('configFactory', function(mvLoader, errorHandler, $q) {
      var scope = this;

      loadConfig().then(function(data) {
        scope.config = data
      });



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
