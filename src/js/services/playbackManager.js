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
  .factory('playbackManager', function($timeout, configFactory) {

    var scope = this;

    var components = [],
        element;
    scope.duration = 0;
    scope.ready = false;

    scope.init = function(elem) {

      configFactory.loadConfig().then(function(data) {
        scope.config = data;
      });

      elem.style.visibility = 'hidden';

      element = elem;
    };

    scope.componentReady = function(name) {
      if(components.indexOf(name) === -1) {
        components.push(name);
      }

      if(components.length === configFactory.config.components.length) {
        var configDuration = scope.config.duration;

        if(configDuration < 2) {
          return;
        }

        $timeout(function() {

          element.style.visibility = 'visible';
          setReady(configDuration);

          $timeout(function() {
            // This is where the 'player.endTemplate' will go
          }, configDuration * 1000);
        }, 300);
      }
    };

    function setReady(duration) {
      scope.duration = duration;
      scope.ready = true;
    }

    return scope;
  });
