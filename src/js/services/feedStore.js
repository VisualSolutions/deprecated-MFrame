/**
 * Created by alex.depatie on 2/2/16.
 */
'use strict';

angular.module('mvFramework')
  .factory('feedStore', feedStore);

function feedStore(localStorageService) {
  var scope = this;

  scope.saveFeed = function(feed, key) {
    if(localStorageService.isSupported) {
      localStorageService.set(key, feed);
    }
  };

  scope.getFeed = function(key) {
    if(localStorageService.isSupported) {
      localStorageService.get(key);
    }
  };

  scope.removeFeed = function(key) {
    if(localStorageService.isSupported) {
      localStorageService.remove(key);
    }
  };

  scope.bindToScope = function(localScope, key) {
    if(localStorageService.isSupported) {
      localStorageService.bind(localScope, key)
    }
  };

  return this;
}