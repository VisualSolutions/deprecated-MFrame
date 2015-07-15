/**
 * Created by alex.depatie on 5/22/15.
 */
 'use strict';
angular
    .module('mvFramework')
    .directive('mvText', function(configFactory, $filter, $timeout, fontFactor) {
      return {
        restrict: 'E',
        replace: true,
        scope: {path: '@'},
        templateUrl: 'template/mv-text.html',
        link: function(scope, element, attr) {
          scope.config = null;
          scope.containerStyles = {};
          scope.textStyles = {};
          scope.content = null;

          scope.getConfig = getConfig;
          scope.setupConfig = setupConfig;

          scope.getConfig();

          /////


          function getConfig() {
            configFactory.getComponentConfig(scope.path).then(function(data) {
              console.log(data);
              scope.config = data;
              setupConfig();
            });
          }

          var resizer = function() {
            console.log(scope.content.length);
            var optimumSize = Math.sqrt(element[0].clientWidth * element[0].clientHeight / scope.content.length);
            var newSize = Math.max(Math.min(optimumSize * fontFactor.factor, scope.config.params.fontMax), scope.config.params.fontMin);



            scope.textStyles.fontSize = newSize + 'px';
          };

          function setupConfig() {
            scope.content = scope.config.params.value;
            console.log('content', scope.content);

            $timeout(resizer(), 1000);
            // Set single or multi-line text


            angular.forEach(scope.config.styles, function(style) {
              scope.containerStyles[style.cssProperty] = style.value;
            });
          }
        }
      }
    });

angular
    .module('mvFramework')
    .run(['$templateCache', function($templateCache) {
      $templateCache.put('template/mv-text.html',
        '<div class="mv-text" ng-style="containerStyles">' +
        '  <span class="text-content" ng-bind="content" ng-style="textStyles"></span>' +
        '</div>'
      )
}]);
