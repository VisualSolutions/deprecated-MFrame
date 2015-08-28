/**
 * Created by alex.depatie on 8/25/15.
 */
'use strict';

angular.module('frameworkTest')
    .directive('debugPanel', function(timerProvider) {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: 'template/debug-panel.html',
        link: function(scope, element, attrs) {
          scope.debugItems = [];
/*
          scope.$watch(timerProvider.timers.length, function() {
            scope.debugTimers = timerProvider.timers;
          });*/
        }
      }
    });

angular.module('frameworkTest').run(['$templateCache', function($templateCache) {
  $templateCache.put('template/debug-panel.html',
      '<div class="debug-panel">' +
      ' <ul>' +
      '   <li class="debug-item" ng-repeat="item in debugTimers">' +
      '     <span class="item-name" ng-bind="item.name"></span>' +
      '     <span class="item-value" ng-bind="item.value"></span>'+
  '   </li>' +
  ' </ul>' +
  '</div>'
  )
}]);