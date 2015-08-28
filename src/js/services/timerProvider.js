'use strict';

angular.module('mvFramework')
    .factory('timerProvider', function($interval, $q) {
      var scope = this;

      scope.timers = [];

      scope.setTimer = setTimer;
      scope.stopTimer = stopTimer;
      scope.startTimer = startTimer;
      scope.startAllTimers = startAllTimers;

      return scope;

      ///////

      function setTimer(name) {
        if(!scope.timers.some(function(timer){return timer.name === name}))
        scope.timers.push(new Timer(name));
      }

      function startAllTimers() {
        scope.timers.map(function(timer) {
          timer.start();
        })
      }

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
          startTime = new Date().getTime();

          timeLoop = $interval(function() {
            var time = new Date().getTime() - startTime;

            elapsed = Math.floor(time / 100) / 10;
            if(Math.round(elapsed) == elapsed) { elapsed += '.00'; }

            scope.value = elapsed;
          }, 100);
        };

        scope.stop = function() {
          $interval.cancel(timeLoop);
        };

        return scope;
      }
    });
