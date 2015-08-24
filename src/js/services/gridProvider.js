
 'use strict';
angular
    .module('mvFramework')
    .factory('gridProvider', function() {
      var scope = this;

      scope.grid = {};

      scope.setupGrid = setupGrid;

      return scope;

      ///////

      function setupGrid(windowHeight, windowWidth) {
        scope.grid.class = setRatioClass(windowWidth / windowHeight);
      }

      function setRatioClass(ratio) {
        switch(true) {
          case ratio < .10:
            return 'xspt';
          case ratio < .20:
            return 'spt';
          case ratio < .5:
            return 'mpt';
          case ratio < .64:
            return 'lpt';
          case ratio < .9:
            return 'pt';
          case ratio < .96:
            return 'tsq';
          case ratio < 1.1:
            return 'sq';
          case ratio < 1.3:
            return 'wsq';
          case ratio < 1.7:
            return 'ls';
          case ratio < 2:
            return 'lls';
          case ratio < 3:
            return 'mls';
          case ratio < 5:
            return 'sls';
          case ratio > 5:
            return 'xsls';
          default:
            break;
        }
      }
    });
