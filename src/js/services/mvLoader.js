
 'use strict';

angular
    .module('mvFramework')
    .service('mvLoader', function($http, errorHandler) {
      var service = this;

      service.loadConfig = loadConfig;

      return service;

      function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
      }

      function loadConfig() {
        var jsonPath = getParameterByName("data") || "mframe.json";

        return $http.get(jsonPath).success(function(data) {
              return data;
            }).error(function() {
              errorHandler.report(101);
            });
      }
    });
