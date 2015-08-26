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
  .factory('playbackManager', function($timeout, configFactory, $rootScope, debugSelector) {

    var scope = this;

    scope.duration = 0;
    scope.ready = false;

    scope.init = function(elem, componentScope) {
      elem.style.visibility = 'hidden';

      configFactory.loadConfig().then(function(data) {
        $timeout(function() {
          var configDuration = data.duration;

          if(configDuration < 2) {
            return;
          }

          elem.style.visibility = 'visible';

          setReady(configDuration);

          $timeout(function() {
            // This is where the 'player.endTemplate' will go
          }, configDuration * 1000);
        }, 500)
      });






      function setReady(duration) {
        scope.duration = duration;
        scope.ready = true;
      }
    };


    return scope;
  });
