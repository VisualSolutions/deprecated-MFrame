/**
 * Created by alex.depatie on 2/2/16.
 */
(function() {
  angular
      .module('mvFramework')
      .directive('mvImageSlideshow', function(yqlService, $interval, $animate, feedFilter, configFactory, playbackManager) {
        return {
          restrict: 'E',
          templateUrl: function(tElem, tAttrs) {
            var tpl = 'template/mv-image-slideshow.html';

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
            scope.config = null;
            scope.params = null;

            var slideCount = 0;

            var timerName = 'imageSlideshow'+ scope.$id;

            getConfig();

            function getConfig() {
              configFactory.getComponentConfig(scope.path).then(function(data) {
                console.log(data);
                scope.config = data;
                setupConfig(prepareSlideshow());
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

              scope.params = scope.config.params;

              callback();
            }

            function startSlideshow() {
              $interval(function() {
                slideCount = (slideCount >= scope.slides.length) ? 0 : slideCount + 1;
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
            '    <div class="slide-item-title" ng-bind="currentItem.title || limitTo: params.maxTitleChars"></div>' +
            '    <div class="slide-item-body" ng-bind="currentItem.item || limitTo: params.maxBodyChars"></div>' +
            '  </div>' +
            '</div>');
      }]);
})();