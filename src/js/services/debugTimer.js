

'use strict';

angular.module('mvFramework')
    .factory('debugTimer', function($interval) {
      var scope = this;

      scope.timers = [];

      scope.setTimer = setTimer;
      scope.stopTimer = stopTimer;


      return scope;

      ///////

      function setTimer(name) {
        if(!scope.timers.some(function(timer){return timer.name === name}))
        scope.timers.push(new Timer(name));
      }

      function stopTimer(name) {
        scope.timers.filter(function(timer) {return timer.name === name})[0].stop();
      }

      function Timer(name) {
        var elapsed, startTime = new Date().getTime();
        var scope = this;

        scope.name = name;

        var timeLoop = $interval(function() {
          var time = new Date().getTime() - startTime;

          elapsed = Math.floor(time / 100) / 10;
          if(Math.round(elapsed) == elapsed) { elapsed += '.00'; }

          scope.value = elapsed;
        }, 100);

        scope.stop = function() {
          $interval.cancel(timeLoop);
        };

        return scope;
      }
    });
