/**
 * Created by alex.depatie on 2/2/16.
 */
(function() {
  angular
      .module('mvFramework')
      .directive('mvTextSlideshow', function(yqlService, $interval, $animate, feedFilter, configFactory, playbackManager, $timeout) {
        return {
          restrict: 'E',
          templateUrl: function(tElem, tAttrs) {
            var tpl = 'template/mv-text-slideshow.html';

            if(tAttrs.templateUrl) {
              tpl = tAttrs.templateUrl;
            }

            return tpl;
          },
          scope: {
            path: '@'
          },
          replace: true,
          link: function(scope, element, attrs) {
            scope.feed = {};
            scope.itemStyles = {};
            scope.containerStyles = {};
            scope.titleWrapperStyles = {};
            scope.bodyWrapperStyles = {};
            scope.config = null;
            scope.params = null;

            var slideCount = 0;

            var timerName = 'textSlideshow'+ scope.$id;

            getConfig();

            function getConfig() {
              configFactory.getComponentConfig(scope.path).then(function(data) {
                console.log(data);
                scope.config = data;
                setupConfig(prepareSlideshow);
                /*
                 if(debugSelector.debug === true && !console.time('test')){
                 timerProvider.setTimer(timerName + 'Intro');
                 timerProvider.setTimer(timerName + 'Loop');
                 timerProvider.setTimer(timerName + 'Outro');
                 }
                 */
              });
            }

            function setupConfig(callback) {
              scope.slides = scope.config.params.value;

              angular.forEach(scope.config.styles, function(style) {
                if(style.cssProperty !== "verticalAlign") {
                  scope.containerStyles[style.cssProperty] = style.value;
                }
              });

              scope.itemStyles.verticalAlign = scope.config.styles["verticalAlign"].value;

              scope.params = scope.config.params;

              $timeout(function() {

                scope.containerStyles.left = gridChecker.check(scope.path, 'left') * (100/24) + '%';
                scope.containerStyles.top = gridChecker.check(scope.path, 'top') * (100/24) + '%';
                scope.containerStyles.width = gridChecker.check(scope.path, 'width') * (100/24) + '%';
                scope.containerStyles.height = gridChecker.check(scope.path, 'height') * (100/24) + '%';

              }, 0);

              callback();
            }

            function startSlideshow() {
              $interval(function() {
                slideCount = (slideCount >= scope.slides.length - 1) ? 0 : slideCount + 1;
                console.log(slideCount, scope.slides.length);
                scope.currentItem = scope.slides[slideCount];
              }, scope.params.itemDisplayTime * 1000)
            }

            function prepareSlideshow() {

              scope.currentItem = scope.slides[slideCount];


              playbackManager.componentReady(timerName);
              startSlideshow();
            }

            console.log(scope.slides);
          }
        }
      });

  angular
      .module('mvFramework')
      .run(['$templateCache', function($templateCache) {
        $templateCache.put('template/mv-text-slideshow.html',
            '<div class="mv-text-slideshow" ng-style="containerStyles">' +
            '  <div class="slide-item swap-animation" ng-animate-swap="currentItem" ng-style="itemStyles">' +
            '    <div class="slide-item-title" ng-bind="currentItem.title | limitTo: params.maxTitleChars"></div>' +
            '    <div class="slide-item-body" ng-bind="currentItem.body | limitTo: params.maxBodyChars"></div>' +
            '  </div>' +
            '</div>');
      }]);
})();