/**
 * Created by alex.depatie on 2/9/16.
 */
(function() {
  'use strict';

  angular
      .module('bgTemplate', ['mvFramework']);
})();
/**
 * Created by alex.depatie on 2/9/16.
 */
(function() {

  'use strict';

  angular
      .module('bgTemplate')
      .controller('TemplateCtrl', function($scope, $element, playbackManager, gridConfig) {
        playbackManager.init($element[0], $scope);
        gridConfig.setConfig([
          {
            pathName: 'bgImage',
            left: {
              ls: 0
            },
            top: {
              ls: 0
            },
            width: {
              ls: 24
            },
            height: {
              ls: 24
            }
          },
          {
            pathName: 'sideImage',
            left: {
              ls: 20
            },
            top: {
              ls:0
            },
            width: {
              ls: 4
            },
            height: {
              ls: 24
            }
          },
          {
            pathName: 'bottomHeaderText',
            left: {
              ls: 0
            },
            top: {
              ls: 22
            },
            width: {
              ls: 4
            },
            height: {
              ls: 2
            }
          },
          {
            pathName: 'bottomBodyText',
            left: {
              ls: 4
            },
            top: {
              ls: 22
            },
            width: {
              ls: 16
            },
            height: {
              ls: 2
            }
          }
        ])
      });
})();