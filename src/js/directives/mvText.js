
'use strict';
angular
    .module('mvFramework')
    .directive('mvText', function($interval, configFactory, $filter, $timeout, fontFactor, gridChecker, $animate, $rootScope, debugSelector, debugTimer, playbackManager) {
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


          var timerName = 'text'+ scope.$id;

          scope.getConfig();

          var statusChecker = scope.$watch(function() {
            return playbackManager.ready;
          }, function(status) {
            if(status === true) {
              initAnimations(playbackManager.duration);
              statusChecker();
            }
          });

          /////


          function getConfig() {
            configFactory.getComponentConfig(scope.path).then(function(data) {
              scope.config = data;
              setupConfig();
            });
          }

          function resizer() {
            var optimumSize = Math.sqrt(element[0].clientWidth * element[0].clientHeight / scope.content.length);
            var newSize = Math.max(Math.min(optimumSize * fontFactor.factor, scope.config.params.fontMax), scope.config.params.fontMin);

            scope.textStyles.fontSize = newSize + 'px';
          }

          function setupConfig() {
            scope.content = scope.config.params.value;


            angular.forEach(scope.config.styles, function(style) {
              if(style.cssProperty !== "verticalAlign") {
                scope.containerStyles[style.cssProperty] = style.value;
              }
            });

            scope.textStyles.verticalAlign = scope.config.styles["verticalAlign"].value;

            $timeout(function() {

              scope.containerStyles.left = gridChecker.check(scope.path, 'left') * (100/24) + '%';
              scope.containerStyles.top = gridChecker.check(scope.path, 'top') * (100/24) + '%';
              scope.containerStyles.width = gridChecker.check(scope.path, 'width') * (100/24) + '%';
              scope.containerStyles.height = gridChecker.check(scope.path, 'height') * (100/24) + '%';

              $timeout(function(){
                scope.containerStyles.lineHeight = element[0].clientHeight + 'px';
                resizer();
              }, 30);
            }, 0);
          }

          function initAnimations(duration) {
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

              } else if(scope.config.animation.outro.duration + scope.config.animation.intro.duration === duration) {
                loopSkip = true;
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
                    if(loopSkip === false) {
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
      $templateCache.put('template/mv-text.html',
        '<div class="mv-text" ng-style="containerStyles">' +
        '  <span class="text-content" ng-bind="content" ng-style="textStyles"></span>' +
        '</div>'
      )
}]);
