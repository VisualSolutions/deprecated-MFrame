/**
 * Created by alex.depatie on 6/29/15.
 */
angular.module('frameworkTest')
  .controller('templateCtrl', function($scope, gridConfig, $timeout, $element) {
    $element[0].style.visibility = 'hidden';

    $timeout(function() {
      $element[0].style.visibility = 'visible';
    }, 100)

    gridConfig.setConfig([
      {
        pathName: 'mainImage',
        left: {
          ls: 1,
          pt: 1
        },
        top: {
          ls: 2,
          pt: 1
        },
        width: {
          ls: 7,
          pt: 22
        },
        height: {
          ls: 18,
          pt: 9
        }
      },
      {
        pathName: 'moveScroll',
        left: {
          ls: 8,
          pt: 0
        },
        top: {
          ls: 1,
          pt: 10
        },
        width: {
          ls: 15,
          pt: 23
        },
        height: {
          ls: 20,
          pt: 14
        }
      },
      {
        pathName: 'textBox',
        left: {
          ls: 5,
          pt: 4
        },
        top: {
          ls: 4,
          pt: 4
        },
        width: {
          ls: 16,
          pt: 17
        },
        height: {
          ls: 18,
          pt: 19
        }
      },
      {
        pathName: 'headerText',
        left: {
          ls:0,
          pt: 0
        },
        top: {
          ls: 0,
          pt: 0
        },
        width: {
          ls: 24,
          pt: 24
        },
        height: {
          ls: 9,
          pt: 5
        }
      },
      {
        pathName: 'bodyText',
        left: {
          ls:0,
          pt: 0
        },
        top: {
          ls: 11,
          pt: 6
        },
        width: {
          ls: 24,
          pt: 24
        },
        height: {
          ls: 16,
          pt: 15
        }
      }
    ]);
  });
