/**
 * Created by alex.depatie on 6/1/15.
 */
'use strict';

angular
    .module('mvFramework')
    .service('gridChecker', function(gridProvider) {

      gridProvider.setupGrid();

      var service = this;

      service.check = check;

      return service;

      ///////

      function check(componentConfig, prop) {
        var grid = gridProvider.grid;

        var classes = getClasses();

        if(typeof componentConfig[prop][grid.class] === 'undefined') {
          return componentConfig[prop][classes.slice(classes.indexOf(grid.class + 1)).filter(function (className) {
                return typeof componentConfig[prop][className] !== 'undefined';
              })[0]];
        }


        function getClasses() {
          if(grid.class.indexOf('ls') > -1) {
            return ['xsls', 'sls', 'mls', 'lls', 'ls', 'sq', 'pt', 'lpt', 'mpt', 'spt', 'xspt'];
          } else if(grid.class.indexOf('sq') > -1) {
            return ['tsq', 'sq', 'wsq', 'ls', 'pt', 'lls', 'lpt', 'mls', 'mpt', 'sls', 'spt', 'xsls', 'xspt'];
          }
          return ['xspt', 'spt', 'mpt', 'lpt', 'pt', 'sq', 'ls', 'lls', 'mls', 'sls', 'xsls'];
        }
      }
    });