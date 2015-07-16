
'use strict';

angular
    .module('mvFramework')
    .service('gridChecker', function(gridProvider, gridConfig, $window, $timeout) {

      gridProvider.setupGrid();

      var service = this;

      service.check = check;

      return service;

      ///////

      function check(pathName, prop) {
        if(typeof gridProvider.grid.class === 'undefined') {
          gridProvider.setupGrid($window.innerWidth, $window.innerHeight);
        }
        var grid = gridProvider.grid;
        console.log('grid', grid);
        $timeout(function() {
          console.log('pathname', pathName);
          var componentConfig = gridConfig.getConfig(pathName);
          console.log('cf', componentConfig);
          var classes = getClasses(grid);
          console.log('classes',classes);

          if(typeof componentConfig[prop][grid.class] === 'undefined') {
            console.log('classe UD',componentConfig[prop][grid.class]);
            return componentConfig[prop][classes.slice(classes.filter(function (className, index) {
                  console.log('propy',componentConfig[prop][className])
                  return typeof componentConfig[prop][className] !== 'undefined' && index > classes.indexOf(grid.class);
                })[0]];
          } else {
            return componentConfig[prop][grid.class];
          }
        }, 2000);


        function getClasses(grid) {
          console.log('grid2', grid.class);
          if(grid.class.indexOf('ls') > -1) {
            return ['xsls', 'sls', 'mls', 'lls', 'ls', 'sq', 'pt', 'lpt', 'mpt', 'spt', 'xspt'];
          } else if(grid.class.indexOf('sq') > -1) {
            return ['tsq', 'sq', 'wsq', 'ls', 'pt', 'lls', 'lpt', 'mls', 'mpt', 'sls', 'spt', 'xsls', 'xspt'];
          }
          return ['xspt', 'spt', 'mpt', 'lpt', 'pt', 'sq', 'ls', 'lls', 'mls', 'sls', 'xsls'];
        }
      }
    });
