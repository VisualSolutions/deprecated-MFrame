'use strict';

angular
  .module('mvFramework')
  .factory('fontFactor', function() {
    var scope = this;

    scope.factor = 1.2;

    scope.setFactor = setFactor;

    return scope;


    //////

    function setFactor(f) {
      scope.factor = f;
    }
  });
