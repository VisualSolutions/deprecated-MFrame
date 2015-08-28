/**
 * Created by alex.depatie on 5/22/15.
 */
 'use strict';
angular
    .module('mvFramework')
    .directive('mvImage', function(configFactory, $filter, gridChecker, $animate, $timeout, debugSelector, $rootScope, timerProvider, playbackManager) {
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
              if(debugSelector.debug === true){
                timerProvider.setTimer(timerName + 'Intro');
                timerProvider.setTimer(timerName + 'Loop');
                timerProvider.setTimer(timerName + 'Outro');
              }*/

              playbackManager.componentReady(timerName);
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

              loopCount = Math.floor((duration - (scope.config.animation.outro.duration + scope.config.animation.intro.duration)) / scope.config.animation.loop.duration);
              console.log(loopCount);
              if(loopCount === 0) {
                loopSkip = true;
              }
              console.log(loopSkip);

              $timeout(function() {
                endAnimations();
              },(duration - scope.config.animation.outro.duration) * 1000);

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
      $templateCache.put('template/mv-image.html',
        '<div class="mv-image" ng-style="containerStyles">' +
        '  <div class="image-helper"><img ng-style="imageStyles" ng-src="{{content}}" alt="{{path}}"/></div>' +
        '</div>'
      )
}]);
