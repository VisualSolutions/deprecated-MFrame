/**
 * Created by alex.depatie on 5/22/15.
 */
 'use strict';
angular
    .module('mvFramework')
    .directive('mvImage', function(configFactory, $filter, gridChecker, $animate, $timeout, debugSelector, $rootScope, debugTimer) {
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

          var timerName = 'image'+ scope.$id;


          scope.getConfig();

          scope.$on('animation-start', initAnimations);
          /////

          function getConfig() {
            configFactory.getComponentConfig(scope.path).then(function(data) {
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
              if(debugSelector.debug === true){
                debugTimer.setTimer(timerName + 'Intro');
              }
              if(scope.config.animation.outro.duration + scope.config.animation.intro.duration > duration) {
                scope.config.animation.outro.duration = 1;
                scope.config.animation.intro.duration = 1;

              }

              $timeout(function() {

                element.removeClass(
                    scope.config.animation.intro.animation +
                    ' ' +
                    scope.config.animation.intro.timingFunction +
                    ' duration-' +
                    scope.config.animation.intro.duration * 10
                );

                if(debugSelector.debug === true){
                  debugTimer.stopTimer(timerName + 'Intro');
                }
                element.removeClass(
                    scope.config.animation.loop.animation +
                    ' infinite ' +
                    scope.config.animation.loop.timingFunction +
                    ' duration-' +
                    scope.config.animation.loop.duration * 10
                );

                if(debugSelector.debug === true){
                  debugTimer.stopTimer(timerName + 'Loop');
                }

                if(debugSelector.debug === true){
                  debugTimer.setTimer(timerName + 'Outro');
                }
                $animate.addClass(element,
                    scope.config.animation.outro.animation +
                    ' ' +
                    scope.config.animation.outro.timingFunction +
                    ' duration-' +
                    scope.config.animation.outro.duration * 10
                ).then(function() {
                      if(debugSelector.debug === true) {
                        debugTimer.stopTimer(timerName + 'Outro');
                      }

                      if(scope.config.animation.outro.animation.length > 0) {
                        element.addClass('no-display');
                      }
                    });



              }, (duration - scope.config.animation.outro.duration) * 1000);

              if(debugSelector.debug === true){
                debugTimer.setTimer(timerName + 'Intro');
              }

              $animate.addClass(element,
                  'animated ' +
                  scope.config.animation.intro.animation +
                  ' ' +
                  scope.config.animation.intro.timingFunction +
                  ' duration-' +
                  scope.config.animation.intro.duration * 10)
                  .then(function() {
                    if(debugSelector.debug === true){
                      debugTimer.stopTimer(timerName + 'Intro');
                    }
                    element.removeClass(
                        scope.config.animation.intro.animation +
                        ' ' +
                        scope.config.animation.intro.timingFunction +
                        ' duration-' +
                        scope.config.animation.intro.duration * 10
                    );


                    if(debugSelector.debug === true){
                      debugTimer.setTimer(timerName + 'Loop');
                    }

                    $animate.addClass(element,
                        scope.config.animation.loop.animation +
                        ' infinite ' +
                        scope.config.animation.loop.timingFunction +
                        ' duration-' +
                        scope.config.animation.loop.duration * 10
                    );
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
