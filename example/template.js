/**
 * Created by alex.depatie on 6/29/15.
 */
angular.module('frameworkTest')
  .controller('templateCtrl', function($scope, gridConfig) {
    gridConfig.setConfig([
      {
        pathName: 'mainWrapper',
        left: {
          ls: 24,
          pt: 24
        },
        top: {
          ls: 24,
          pt: 24
        },
        width: {
          ls: 24,
          pt: 24
        },
        height: {
          ls: 24,
          pt: 24
        }
      },
      {
        pathName: 'mainImage',
        left: {
          ls: 1,
          pt: 1
        },
        top: {
          ls: 4,
          pt: 4
        },
        width: {
          ls: 8,
          pt: 8
        },
        height: {
          ls: 18,
          pt: 18
        }
      },
      {
        pathName: 'moveScroll',
        left: {
          ls: 9,
          pt: 9
        },
        top: {
          ls: 3,
          pt: 3
        },
        width: {
          ls: 15,
          pt: 15
        },
        top: {
          ls: 20,
          pt: 20
        }
      },
      {
        pathName: 'textBox',
        left: {
          ls: 5,
          pt: 5
        },
        top: {
          ls: 6,
          pt: 6
        },
        width: {
          ls: 14,
          pt: 14
        },
        height: {
          ls: 16,
          pt: 16
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
          ls: 4,
          pt: 4
        }
      },
      {
        pathName: 'bodyText',
        left: {
          ls:0,
          pt: 0
        },
        top: {
          ls: 4,
          pt: 4
        },
        width: {
          ls: 24,
          pt: 24
        },
        height: {
          ls: 20,
          pt: 20
        }
      }

    ]);
  });
