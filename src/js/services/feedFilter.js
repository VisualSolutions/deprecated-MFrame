/**
 * Created by alex.depatie on 2/3/16.
 */
'use strict';

angular.module('mvFramework')
  .service('feedFilter', feedFilter);

function feedFilter() {
  var scope = this;

  scope.wordFilter = function(feed, list) {
    return feed.filter(function(item) {
      return !list.some(function(word) {
        return item.title.contains(word) || item.item.contains(word);
      })
    });
  };

  scope.categoryFilter = function(feed, categories) {
    return feed.filter(function(item) {
      return categories.some(function(category) {
        return item.category === category;
      })
    });
  };

  return scope;
}