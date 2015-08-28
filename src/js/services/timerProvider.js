'use strict';

angular.module('mvFramework')
    .factory('timerProvider', function($interval, $q) {
      var scope = this;

      scope.stopTimer = stopTimer;
      scope.startTimer = startTimer;

      return scope;

      ///////


      function startTimer(name) {
        scope.timers.filter(function(timer) {return timer.name === name})[0].start();
      }

      function stopTimer(name) {
        scope.timers.filter(function(timer) {return timer.name === name})[0].stop();
      }

      function Timer(name) {
        var timeLoop, elapsed, startTime;
        var scope = this;
        scope.name = name;

        scope.start = function() {
          startTime = performance.now();
        };

        scope.stop = function() {
          console.log(name + ': ' + (performance.now() - startTime));
        };

        return scope;
      }
    });
