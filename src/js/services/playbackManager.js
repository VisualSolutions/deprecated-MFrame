/***
           ___          ___         ___        _____                 ___          ___        _____                  ___
         /__/ \       /  /\       /  /\      /  /::\               /__/ \       /  /\      /  /::\     ___        /  /\
        |  |::\     /  /::\     /  /::\    /  /:/\:\              |  |::\     /  /:/_    /  /:/\:\   /  /\      /  /::\
       |  |:|:\   /  /:/\:\   /  /:/\:\  /  /:/  \:\             |  |:|:\   /  /:/ /\  /  /:/  \:\ /  /:/     /  /:/\:\
    __|__|:|\:\ /  /:/  \:\ /  /:/  \:\/__/:/ \__\:|          __|__|:|\:\ /  /:/ /:/_/__/:/ \__\:/__/::\    /  /:/~/::\
  /__/::::| \:/__/:/ \__\:/__/:/ \__\:\  \:\ /  /:/         /__/::::| \:/__/:/ /:/ /\  \:\ /  /:\__\/\:\__/__/:/ /:/\:\
 \  \:\~~\__\\  \:\ /  /:\  \:\ /  /:/\  \:\  /:/          \  \:\~~\__\\  \:\/:/ /:/\  \:\  /:/   \  \:\/\  \:\/:/__\/
 \  \:\      \  \:\  /:/ \  \:\  /:/  \  \:\/:/            \  \:\      \  \::/ /:/  \  \:\/:/     \__\::/\  \::/
 \  \:\      \  \:\/:/   \  \:\/:/    \  \::/              \  \:\      \  \:\/:/    \  \::/      /__/:/  \  \:\
 \  \:\      \  \::/     \  \::/      \__\/                \  \:\      \  \::/      \__\/       \__\/    \  \:\
 \__\/       \__\/       \__\/                             \__\/       \__\/                             \__\/
 */

'use strict';

angular.module('mvFramework')
  .factory('playbackManager', function($timeout, configFactory, $rootScope) {


    this.init = function(elem, componentScope) {
      elem.style.visibility = 'hidden';

      configFactory.loadConfig().then(function(data) {
        $timeout(function() {
          var configDuration = data.duration;
          elem.style.visibility = 'visible';

          beginCycle(componentScope, configDuration);

          $timeout(function() {
            angular.element(elem).addClass('animated fadeOut');
            // This is where the 'player.endTemplate' will go
          }, configDuration * 1000);
        }, 100)
      });




      function beginCycle(scope, duration) {
        scope.$broadcast('animation-start', duration);
      }
    };


    return this;
  });
