'use strict';

angular.module('mvFramework')
  .factory('playbackManager', function($timeout, configFactory) {

    this.beginCycle = function(scope) {
      var config = configFactory.config;
      scope.$broadcast('animation-start');

      $timeout(function() {
        scope.$broadcast('animation-ending');
      }, config.duration*1000 - 10000);
    }


    return this;
  });
