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
        return item.title.indexOf(word) > -1 || item.item.indexOf(word) > -1;
      })
    });
  };

  scope.categoryFilter = function(feed, categories) {
    return feed.filter(function(item) {
      return categories.filter(function(category) {
        return category.enabled;
      }).some(function(category) {
        return item.category === category.name;
      })
    });
  };

  scope.filterAll = function(feed, categories, list, limit) {
    return scope.wordFilter(scope.categoryFilter(feed, categories), list)
        .filter(function(item, index) {
          return index < limit;
        });
  };

  return scope;
}