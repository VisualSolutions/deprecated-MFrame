/**
 * Created by alex.depatie on 5/25/15.
 */
'use strict';

angular
    .module('mvFramework')
    .factory('errorHandler', function() {
      var scope = this;

      return scope;

      function report(code) {

        function error() {
          function formatError(code, message) {
            return 'ERROR ' + code + ': ' + message;
          }
          switch(code) {
            case 101:
              return formatError(101,
                  'Failed to load JSON config file'
              );
          }
        }
        console.log(error);
      }
    });