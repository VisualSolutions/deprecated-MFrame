'use strict';

angular.module('mvFramework')
  .factory('playbackManager', function($timeout, configFactory) {

    this.beginCycle = function(scope) {
      var config = configFactory.config;
      scope.$broadcast('animation-start', config.duration);
    };


    return this;
  });
