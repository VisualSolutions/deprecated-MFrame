
'use strict';

angular
    .module('mvFramework')
    .service('gridChecker', function(gridProvider, gridConfig, $window, $timeout) {

      gridProvider.setupGrid($window.innerHeight, $window.innerWidth);

      var service = this;

      service.check = check;

      return service;

      ///////

      function check(pathName, prop) {
        var componentConfig = null;
        var currentClass = gridProvider.grid.class;
        var classes = getClasses(currentClass);

        if(typeof pathName === 'string') {
          componentConfig = gridConfig.getConfig(pathName);
        } else {
          console.log('Error: pathName is not a string');
        }
        console.log('CompConfig', componentConfig);
        if(typeof componentConfig[prop][currentClass] !== "undefined") {
          console.log('is defined', componentConfig[prop][currentClass], componentConfig[prop]);
          return componentConfig[prop][currentClass];
        } else {
          for(var k = classes.indexOf(currentClass); k < classes.length; k++) {
            if(typeof componentConfig[prop][classes[k]] !== 'undefined') {
              console.log('not defined', componentConfig[prop][classes[k]]);
              return componentConfig[prop][classes[k]];
            }
          }
        }


        function getClasses(currentClass) {
          console.log('get classes class', currentClass);
          if(currentClass.indexOf('ls') > -1) {
            return ['xsls', 'sls', 'mls', 'lls', 'ls', 'sq', 'pt', 'lpt', 'mpt', 'spt', 'xspt'];
          } else if(currentClass.indexOf('sq') > -1) {
            return ['tsq', 'sq', 'wsq', 'ls', 'pt', 'lls', 'lpt', 'mls', 'mpt', 'sls', 'spt', 'xsls', 'xspt'];
          }
          return ['xspt', 'spt', 'mpt', 'lpt', 'pt', 'sq', 'ls', 'lls', 'mls', 'sls', 'xsls'];
        }
      }
    });
