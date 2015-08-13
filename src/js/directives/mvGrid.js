'use strict';

angular
.module('mvFramework')
  .directive('mvGrid', function(gridChecker) {
    return {
      restrict: 'A',
      scope: true,
      replace: true,
      template: '<div ng-style="blockStyles" ng-transclude></div>',
      transclude: true,
      link: function(scope, element, attrs) {
        scope.blockStyles = {};
        console.log('mvgrid', element[0], attrs.mvGrid);
        scope.blockStyles.left = gridChecker.check(attrs.mvGrid, 'left') * (100/24) + '%';
        scope.blockStyles.top = gridChecker.check(attrs.mvGrid, 'top') * (100/24) + '%';
        scope.blockStyles.width = gridChecker.check(attrs.mvGrid, 'width') * (100/24) + '%';
        scope.blockStyles.height = gridChecker.check(attrs.mvGrid, 'height') * (100/24) + '%';
      }
    }
  });
