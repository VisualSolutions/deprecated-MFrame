/**
 * Created by alex.depatie on 5/22/15.
 */
angular
    .module('mvFramework')
    .provider('mvLoader', function($http, errorHandler) {
      var jsonPath = 'config.json';

      this.setJsonPath = function(p) {
        jsonPath = p;
      };

      function Loader() {
        this.loadJson = function() {
          return $http.get(jsonPath).success(function(data) {
            return data;
          }).error(function() {
            errorHandler.report(101);
          });
        }
      }

      this.$get = function() {
        return new Loader();
      };

    });