
'use strict';
angular
    .module('mvFramework')
    .directive('mvText', function($interval, configFactory, $filter, $timeout, fontFactor, gridChecker, $animate, $rootScope, debugSelector, timerProvider, playbackManager) {
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
/*
              if(debugSelector.debug === true && !console.time('test')){
                timerProvider.setTimer(timerName + 'Intro');
                timerProvider.setTimer(timerName + 'Loop');
                timerProvider.setTimer(timerName + 'Outro');
              }
*/
              playbackManager.componentReady(timerName);
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
            var loopSkip = false,
                loopCount;
            if(scope.config === null) {
              getConfig();
            }

            if(scope.config.animation) {

              if(scope.config.animation.outro.duration + scope.config.animation.intro.duration > duration) {
                scope.config.animation.outro.duration = 1;
                scope.config.animation.intro.duration = 1;
              }

              if(duration - (scope.config.animation.outro.duration + scope.config.animation.intro.duration) < scope.config.animation.loop.duration) {
                loopSkip = true;
              }

              loopCount = Math.floor((duration - (scope.config.animation.outro.duration + scope.config.animation.intro.duration)) / scope.config.animation.loop.duration) || 0;
              console.log(loopCount);
              if(loopCount === 0 || Infinity) {
                loopSkip = true;
              }
              console.log(loopSkip);

              $timeout(function() {
                endAnimations();
              },(duration - scope.config.animation.outro.duration) * 1000);

              console.log((duration - scope.config.animation.outro.duration) * 1000);

              animateIntro()
                  .then(function() {
                    endIntro();
                    if(loopSkip === false) {
                      animateLoop(loopCount).then(function() {
                        endLoop();
                      });
                    }
                  })
            }

            function endAnimations() {
              endIntro();
              endLoop();
              animateOutro()
                  .then(function() {
                    endOutro();
                  });
            }

            function animateLoop(count) {
              if(debugSelector.debug === true){
                console.time(timerName + 'Loop');
              }
              return $animate.addClass(element,
                  scope.config.animation.loop.animation + ' ' +
                  scope.config.animation.loop.timingFunction +
                  ' duration-' +
                  scope.config.animation.loop.duration * 10 +
                  ' iteration-count-' + count
              );
            }

            function animateIntro() {
              if(debugSelector.debug === true){
                console.time(timerName + 'Intro');
              }
              return $animate.addClass(element,
                  scope.config.animation.intro.animation + ' ' +
                  scope.config.animation.intro.timingFunction +
                  ' duration-' +
                  scope.config.animation.intro.duration * 10 +
                  ' iteration-count-1'
              );
            }

            function animateOutro() {
              if(debugSelector.debug === true){
                console.time(timerName + 'Outro');
              }
              $timeout(function() {
                element.addClass('no-display');
              }, scope.config.animation.outro.duration * 1000);
              return $animate.addClass(element,
                  scope.config.animation.outro.animation + ' ' +
                  scope.config.animation.outro.timingFunction +
                  ' duration-' +
                  scope.config.animation.outro.duration * 10
              );
            }

            function endLoop() {
              if(debugSelector.debug === true) {
                console.timeEnd(timerName + 'Loop');
              }
              element.removeClass(
                  scope.config.animation.intro.animation +
                  ' ' +
                  scope.config.animation.intro.timingFunction +
                  ' duration-' +
                  scope.config.animation.intro.duration * 10 +
                  ' iteration-count-1'
              );
            }

            function endIntro() {
              if(debugSelector.debug === true) {
                console.timeEnd(timerName + 'Intro');
              }
              element.removeClass(
                  scope.config.animation.intro.animation +
                  ' ' +
                  scope.config.animation.intro.timingFunction +
                  ' duration-' +
                  scope.config.animation.intro.duration * 10 +
                  ' iteration-count-1'
              );
            }
            function endOutro() {
              element.addClass('no-display');

              if(debugSelector.debug === true) {
                console.timeEnd(timerName + 'Outro');
              }
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
