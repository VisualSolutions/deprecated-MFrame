/**
 * Created by alex.depatie on 5/22/15.
 */
angular
    .module('mvFramework')
    .provider('mvLoader', function() {
      var jsonPath = 'config.json';

      this.setJsonPath = function(p) {
        jsonPath = p;
      };

      function Loader($http, errorHandler) {
        this.loadConfig = function() {
          return $http.get(jsonPath).success(function(data) {
            return angular.fromJson(data);
          }).error(function() {
            errorHandler.report(101);
          });
        }
      }

      this.$get = function($http, errorHandler) {
        return new Loader($http, errorHandler);
      };

    });
