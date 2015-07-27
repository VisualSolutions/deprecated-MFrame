
 'use strict';
angular
    .module('mvFramework')
    .directive('mvText', function(configFactory, $filter, $timeout, fontFactor, gridChecker) {
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

          function resizer() {
            var optimumSize = Math.sqrt(element[0].clientWidth * element[0].clientHeight / scope.content.length);
              console.log('op size',optimumSize, 'width', element[0].clientWidth, 'height', element[0].clientHeight, 'length', scope.content.length);
            var newSize = Math.max(Math.min(optimumSize * fontFactor.factor, scope.config.params.fontMax), scope.config.params.fontMin);

            scope.textStyles.fontSize = newSize + 'px';
          };

          function setupConfig() {
            scope.content = scope.config.params.value;
            console.log('content', scope.content);


            angular.forEach(scope.config.styles, function(style) {
              if(style.cssProperty !== "verticalAlign") {
                scope.containerStyles[style.cssProperty] = style.value;
              }
            });

            scope.textStyles.verticalAlign = scope.config.styles["verticalAlign"].value;

            console.log('textStyles', scope.textStyles);

            $timeout(function() {

              scope.containerStyles.left = gridChecker.check(scope.path, 'left') * (100/24) + '%';
              scope.containerStyles.top = gridChecker.check(scope.path, 'top') * (100/24) + '%';
              scope.containerStyles.width = gridChecker.check(scope.path, 'width') * (100/24) + '%';
              scope.containerStyles.height = gridChecker.check(scope.path, 'height') * (100/24) + '%';
              console.log('containerStyles', scope.containerStyles, gridChecker.check(scope.path, 'left'));

              $timeout(function(){
                scope.containerStyles.lineHeight = element[0].clientHeight + 'px';
                resizer();
              }, 30);
            }, 0);
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
