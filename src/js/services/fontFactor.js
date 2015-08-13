'use strict';

angular
  .module('mvFramework')
  .factory('fontFactor', function() {
    var scope = this;

    scope.factor = .95;

    scope.setFactor = setFactor;

    return scope;


    //////

    function setFactor(f) {
      scope.factor = f;
    }
  });
