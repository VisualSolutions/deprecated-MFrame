/**
 * Created by alex.depatie on 2/2/16.
 */
(function() {
  angular
      .module('mvFramework')
      .directive('mvNews', function(yqlService, $interval, $animate, feedFilter, configFactory, playbackManager) {
        return {
          restrict: 'E',
          templateUrl: function(tElem, tAttrs) {
            var tpl = 'template/mv-news.html';

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

            var timerName = 'news'+ scope.$id;

            getConfig();

            function loadFeed() {
              yqlService.getData().then(function(data) {
                scope.feed.entries = feedFilter.filterAll(
                    data,
                    scope.params.categories.list,
                    scope.params.blacklist.words,
                    scope.params.feedLimit
                );

                prepareSlideshow();
              });
            }

            function getConfig() {
              configFactory.getComponentConfig(scope.path).then(function(data) {
                console.log(data);
                scope.config = data;
                setupConfig(loadFeed);
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
              angular.forEach(scope.config.styles, function(style) {
                if(style.cssProperty !== "verticalAlign") {
                  scope.containerStyles[style.cssProperty] = style.value;
                }
              });

              scope.itemStyles.verticalAlign = scope.config.styles["verticalAlign"].value;

              scope.params = scope.config.params;

              callback();
            }

            function startSlideshow() {
              $interval(function() {
                slideCount = (slideCount >= scope.feed.entries.length) ? 0 : slideCount + 1;
                scope.currentItem = scope.feed.entries[slideCount];
              }, scope.params.itemDisplayTime * 1000)
            }

            function prepareSlideshow() {

              scope.currentItem = scope.feed.entries[slideCount];


              playbackManager.componentReady(timerName);
              startSlideshow();
            }

            console.log(scope.feed);
          }
        }
      });

  angular
      .module('mvFramework')
      .run(['$templateCache', function($templateCache) {
        $templateCache.put('template/mv-news.html',
          '<div class="mv-news" ng-style="containerStyles">' +
          '  <div class="feed-item swap-animation" ng-animate-swap="currentItem" ng-style="itemStyles">' +
          '    <div class="feed-item-title" ng-bind="currentItem.title || limitTo: params.maxTitleChars"></div>' +
          '    <div class="feed-item-body" ng-bind="currentItem.item || limitTo: params.maxBodyChars"></div>' +
          '    ' +
          '  </div>' +
          '</div>');
      }]);
})();