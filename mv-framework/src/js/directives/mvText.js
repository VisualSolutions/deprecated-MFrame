/**
 * Created by alex.depatie on 5/22/15.
 */
angular
    .module('mvFramework')
    .directive('mv-text', function(configFactory, $filter) {
      return {
        restrict: 'E',
        scope: {path: '@'},
        templateUrl: 'template/mv-text.html',
        link: function(scope, element, attr) {
          scope.config = null;
          scope.styles = {};
          scope.content = null;

          scope.getConfig = getConfig;
          scope.setupConfig = setupConfig;

          scope.getConfig().setupConfig();


          /////


          function getConfig() {
            scope.config = configFactory.getField(scope.path);

            return scope;
          }

          function limitText(text, max) {
            return $filter('limitTo')(text, max);
          }


          function setupConfig() {
            scope.content = limitText(scope.config.text.value, scope.config.text.maxCharacters);

            // Set single or multi-line text
            scope.styles.whiteSpace = scope.config.text.singleLine ? 'no-wrap' : 'normal';


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
        '<div ng-bind="content" data-fittext data-fittext-max="config.text.fontMax" data-fittext data-fittext-min="config.text.fontMin" ng-style="styles"></div>'
      )
}]);

