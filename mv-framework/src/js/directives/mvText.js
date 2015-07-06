/**
 * Created by alex.depatie on 5/22/15.
 */
 'use strict';
angular
    .module('mvFramework')
    .directive('mvText', function(configFactory, $filter) {
      return {
        restrict: 'E',
        replace: true,
        scope: {path: '@'},
        templateUrl: 'template/mv-text.html',
        link: function(scope, element, attr) {
          scope.config = null;
          scope.styles = {};
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

          function limitText(text, max) {
            return $filter('limitTo')(text, max);
          }

          function resizer() {
            scope.styles.fontSize = '10px';
            var ratio = element[0].offsetHeight / element[0].offsetWidth / 1;
            scope.styles.fontSize = Math.max(
              Math.min((element.parent()[0].offsetWidth - 6) * ratio, parseFloat(scope.config.params.fontMin)),
              parseFloat(scope.config.params.fontMax)
            ) + 'px';
          };

          function setupConfig() {
            scope.content = scope.config.params.value;
            console.log('content', scope.content);

            resizer();
            // Set single or multi-line text
            scope.styles.whiteSpace = scope.config.params.singleLine ? 'no-wrap' : 'normal';


            angular.forEach(scope.config.styles, function(style) {
              scope.styles[style.name] = style.value;
            });
          }
        }
      }
    });

angular
    .module('mvFramework')
    .run(['$templateCache', function($templateCache) {
      $templateCache.put('template/mv-text.html',
        '<div class="mv-text" ng-bind="content" ng-style="styles"></div>'
      )
}]);
