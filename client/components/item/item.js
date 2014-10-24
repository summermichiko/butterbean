'use strict';

angular.module('tripplannerAngularApp')
  .directive('myItem', function() {
    return {
      restrict: 'E',
      scope: {
        item: '=itemInfo',
        url: '=itemUrl'
      },
      templateUrl: 'components/item/item.html'
    };
  });