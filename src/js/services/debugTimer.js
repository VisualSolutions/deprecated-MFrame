/**
 * Created by alex.depatie on 8/25/15.
 */
(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();

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
