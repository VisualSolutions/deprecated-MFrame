/**
 * Created by alex.depatie on 5/22/15.
 */
 'use strict';
angular
    .module('mvFramework')
    .directive('mvImage', function(configFactory, $filter, gridChecker, $animate, $timeout) {
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

          scope.$on('animation-start', initAnimations);
          /////

          function getConfig() {
            configFactory.getComponentConfig(scope.path).then(function(data) {
              console.log(data);
              scope.config = data;
              setupConfig();
            });
          }

          function setupConfig() {
            scope.content = 'images/' + scope.config.params.value;

            var imageElement = angular.element(element.children()[0]);

            scope.containerStyles.left = gridChecker.check(scope.path, 'left') * (100/24) + '%';
            scope.containerStyles.top = gridChecker.check(scope.path, 'top') * (100/24) + '%';
            scope.containerStyles.width = gridChecker.check(scope.path, 'width') * (100/24) + '%';
            scope.containerStyles.height = gridChecker.check(scope.path, 'height') * (100/24) + '%';
            var ratioCheck = element[0].clientWidth > element[0].clientHeight;

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
            var rotation = scope.config.styles['transform'].value;

            scope.imageStyles.transform = rotation;
            scope.imageStyles.WebkitTransform = rotation;

            angular.forEach(scope.config.styles, function(style) {
              if(style.name !== 'Rotation' ) {
                scope.containerStyles[style.cssProperty] = style.value;
              }
            });
            //scope.containerStyles.lineHeight = element[0].clientHeight;


          }


          function initAnimations(event, duration) {
            var loopSkip = false;
            if(scope.config === null) {
              getConfig();
            }

            if(scope.config.animation) {

              if(scope.config.animation.outro.duration + scope.config.animation.intro.duration > duration) {
                scope.config.animation.outro.duration = duration / 2;
                scope.config.animation.intro.duration = duration / 2;
                loopSkip = true;
              }

              $timeout(function() {

                $animate.addClass(element,
                    scope.config.animation.outro.animation +
                    ' duration-' +
                    scope.config.animation.outro.duration * 10
                ).then(function() {


                    });



              }, (duration - scope.config.animation.outro.duration) * 1000);

              $animate.addClass(element,
                  'animated ' +
                  scope.config.animation.intro.animation +
                  ' ' +
                  scope.config.animation.intro.timingFunction +
                  ' duration-' +
                  scope.config.animation.intro.duration * 10)
                  .then(function() {

                    element.removeClass(
                        scope.config.animation.intro.animation +
                        ' ' +
                        scope.config.animation.intro.timingFunction +
                        ' duration-' +
                        scope.config.animation.intro.duration * 10
                    );
                    if(!loopSkip) {
                      $animate.addClass(element,
                          scope.config.animation.loop.animation +
                          ' infinite ' +
                          scope.config.animation.loop.timingFunction +
                          ' duration-' +
                          scope.config.animation.loop.duration * 10
                      );
                    }
                  })
            }
          }
        }
      }
    });

angular
    .module('mvFramework')
    .run(['$templateCache', function($templateCache) {
      $templateCache.put('template/mv-image.html',
        '<div class="mv-image" ng-style="containerStyles">' +
        '  <div class="image-helper"><img ng-style="imageStyles" ng-src="{{content}}" alt="{{path}}"/></div>' +
        '</div>'
      )
}]);
