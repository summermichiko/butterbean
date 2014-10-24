'use strict';

angular.module('tripplannerAngularApp')
  .directive('infoBar', function() {
    return {
      restrict: 'E',
      scope: {
        objectInside: '=infoObject'
      },
      templateUrl: 'components/infobar/infobar.html'
    };
  });