/**
 * Created by alex.depatie on 5/22/15.
 */
 'use strict';
angular
    .module('mvFramework')
    .directive('mvImage', function(configFactory, $filter) {
      return {
        restrict: 'E',
        replace: true,
        scope: {path: '@'},
        templateUrl: 'template/mv-image.html',
        link: function(scope, element, attr) {
          scope.config = null;
          scope.containerStyles = {};
          scope.imageStyles = {};
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

          function setupConfig() {
            scope.content = scope.config.params.value;

            var imageElement = angular.element(element.children()[0]);
            var ratioCheck = imageElement[0].clientWidth > imageElement[0].clientHeight;

            switch(scope.config.params.position) {
              case 'fit':
              scope.imageStyles.height = ratioCheck ? '100%' : 'auto';
              scope.imageStyles.width = ratioCheck ? 'auto' : '100%';
                break;
              case 'fill':
                scope.imageStyles.height = ratioCheck ? 'auto' : '100%';
                scope.imageStyles.width = ratioCheck ? '100%' : 'auto';
                break;
              case 'stretch':
                scope.imageStyles.height = '100%';
                scope.imageStyles.width = '100%';
                break;
              case 'center':
                break;
              default:
                //console.log('') put errorLogger here
                break;
            }

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
      $templateCache.put('template/mv-image.html',
        '<div class="mv-image" ng-style="containerStyles">' +
        '  <div class="image-helper"><img ng-style="imageStyles" ng-src="images/{{content}}" alt="{{path}}"/></div>' +
        '</div>'
      )
}]);
