/**
 * Created by alex.depatie on 5/25/15.
 */
'use strict';

angular
    .module('mvFramework')
    .factory('errorHandler', function() {
      var scope = this;

      scope.report = report;

      return scope;


      //////


      function report(code) {

        function error(code) {

          switch(code) {
            case 101:
              return formatError(101,
                  'Failed to load JSON config file'
              );
          }

          function formatError(code, message) {
            return 'ERROR ' + code + ': ' + message;
          }
        }
        console.log(error(code));
      }
    });
